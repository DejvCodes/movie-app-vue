<script setup lang="ts">
import { GENRES } from '@/constants';
import { computed, ref, useId, watch } from 'vue';
import type { Movie, MovieFormData } from '@/types/movie';
import BaseButton from '@/components/BaseButton.vue';
import StarRating from '@/components/StarRating.vue';

const props = defineProps<{
	open: boolean;
	movie?: Movie | null;
}>();

const emit = defineEmits<{
	submit: [data: MovieFormData];
	cancel: [];
}>();

const emptyForm = (): MovieFormData => ({
	title: '',
	image: '',
	genres: [],
	description: '',
	rating: 0,
});

const form = ref<MovieFormData>(emptyForm());
const submitted = ref<boolean>(false);

const dialog = ref<HTMLDialogElement | null>(null);

const titleId = useId();
const fieldId = useId();

const isEdit = computed(() => Boolean(props.movie));

// Show an error only after the first submit attempt
const genresError = computed(() => submitted.value && form.value.genres.length === 0);

watch(
	() => props.open,
	(open) => {
		if (open) {
			// Fill the form with the edited movie or start empty
			form.value = props.movie
				? {
						title: props.movie.title,
						image: props.movie.image,
						genres: [...props.movie.genres],
						description: props.movie.description,
						rating: props.movie.rating,
					}
				: emptyForm();

			submitted.value = false;
			dialog.value?.showModal();
		} else {
			dialog.value?.close();
		}
	},
	{ immediate: true, flush: 'post' },
);

const cancel = () => {
	emit('cancel');
};

const submit = () => {
	submitted.value = true;
	if (form.value.genres.length === 0) {
		return;
	}

	emit('submit', {
		...form.value,
		title: form.value.title.trim(),
		image: form.value.image.trim(),
		description: form.value.description.trim(),
	});
};

// Handle click on the backdrop (outside the dialog content)
const onBackdropClick = (event: MouseEvent) => {
	if (event.target === dialog.value) {
		emit('cancel');
	}
};

const inputClass = 'w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white dark:bg-slate-800 dark:border-gray-700';
const labelClass = 'block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300';
</script>

<template>
	<dialog
		ref="dialog"
		:aria-labelledby="titleId"
		class="w-full max-w-lg p-0 text-gray-900 bg-white border border-gray-200 rounded-2xl dark:text-gray-100 dark:bg-slate-900 dark:border-gray-800 backdrop:bg-black/60"
		@cancel.prevent="cancel"
		@click="onBackdropClick"
	>
		<form
			class="flex flex-col gap-4 p-6"
			@submit.prevent="submit"
		>
			<h2
				:id="titleId"
				class="text-xl font-bold text-gray-900 dark:text-white"
			>
				{{ isEdit ? 'Edit movie' : 'Add movie' }}
			</h2>

			<!-- Title -->
			<div>
				<label
					:for="`${fieldId}-title`"
					:class="labelClass"
				>
					Title
				</label>
				<input
					:id="`${fieldId}-title`"
					v-model="form.title"
					type="text"
					required
					:class="inputClass"
				/>
			</div>

			<!-- Image -->
			<div>
				<label
					:for="`${fieldId}-image`"
					:class="labelClass"
				>
					Image URL
				</label>
				<input
					:id="`${fieldId}-image`"
					v-model="form.image"
					type="text"
					required
					placeholder="https://..."
					:class="inputClass"
				/>
			</div>

			<!-- Genres -->
			<fieldset>
				<legend :class="labelClass">Genres</legend>
				<div class="flex flex-wrap gap-2">
					<label
						v-for="genre in GENRES"
						:key="genre"
						:class="[
							'px-3 py-1 text-sm transition border rounded-full cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-400',
							form.genres.includes(genre)
								? 'text-indigo-700 bg-indigo-100 border-indigo-300 dark:bg-indigo-900/60 dark:text-indigo-200 dark:border-indigo-700'
								: 'text-gray-600 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800',
						]"
					>
						<input
							v-model="form.genres"
							type="checkbox"
							:value="genre"
							class="sr-only"
						/>
						{{ genre }}
					</label>
				</div>
				<p
					v-if="genresError"
					class="mt-1 text-sm text-red-600 dark:text-red-400"
				>
					Select at least one genre.
				</p>
			</fieldset>

			<!-- Description -->
			<div>
				<label
					:for="`${fieldId}-description`"
					:class="labelClass"
				>
					Description
				</label>
				<textarea
					:id="`${fieldId}-description`"
					v-model="form.description"
					rows="4"
					required
					:class="inputClass"
				/>
			</div>

			<!-- Rating -->
			<div>
				<span :class="labelClass">Rating ({{ form.rating }}/5)</span>
				<StarRating
					:rating="form.rating"
					label="Movie rating"
					@rate="form.rating = $event"
				/>
			</div>

			<div class="flex justify-end gap-3 mt-2">
				<BaseButton
					variant="outline"
					@click="cancel"
				>
					Cancel
				</BaseButton>
				<BaseButton
					type="submit"
				>
					{{ isEdit ? 'Save changes' : 'Add movie' }}
				</BaseButton>
			</div>
		</form>
	</dialog>
</template>
