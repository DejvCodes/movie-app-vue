<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { APP_TITLE } from '@/constants';
import data from '@/data.json';
import type { Movie } from '@/types/movie';
import StarRating from '@/components/StarRating.vue';
import EmptyState from '@/components/EmptyState.vue';
import { ArrowLeftIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
	id: number;
}>();

const movies: Movie[] = data.items;

const movie = computed(() => movies.find((m) => m.id === props.id));

watchEffect(() => {
	document.title = `${movie.value?.title ?? 'Movie not found'} • ${APP_TITLE}`;
});
</script>

<template>
	<div class="flex flex-col justify-center max-w-4xl min-h-screen px-4 py-10 mx-auto">
		<!-- Back link -->
		<RouterLink
			:to="{ name: 'home' }"
			class="inline-flex items-center self-start gap-1.5 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
			<ArrowLeftIcon class="w-4 h-4" aria-hidden="true" />
			Back
		</RouterLink>

		<!-- Movie detail -->
		<article
			v-if="movie"
			class="grid gap-8 mt-8 md:gap-12 md:grid-cols-[16rem_1fr] md:items-center"
		>
			<img
				:src="movie.image"
				:alt="movie.title"
				class="object-cover w-full max-w-[16rem] mx-auto aspect-[3/4] rounded-2xl shadow-xl shadow-gray-900/10 dark:shadow-black/40 md:max-w-none" />

			<div class="text-center md:text-left">
				<p class="text-base tracking-wide text-gray-500 dark:text-gray-400">
					{{ movie.genres.join(' • ') }}
				</p>

				<h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
					{{ movie.title }}
				</h1>

				<div class="flex items-center justify-center gap-3 mt-4 md:justify-start">
					<span class="text-sm text-gray-500 dark:text-gray-400">
						Rating ({{ movie.rating }}/5)
					</span>
					<StarRating
						:rating="movie.rating"
						readonly
					/>
				</div>

				<p class="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
					{{ movie.description }}
				</p>
			</div>
		</article>

		<!-- Not found -->
		<EmptyState
			v-else
			title="Movie not found"
			heading-tag="h1"
			description="The movie you are looking for does not exist."
			class="mt-8"
		>
			<template #icon>
				<QuestionMarkCircleIcon class="w-12 h-12" />
			</template>
		</EmptyState>
	</div>
</template>
