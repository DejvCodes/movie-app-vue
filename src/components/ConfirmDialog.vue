<script setup lang="ts">
import { ref, useId, watch } from 'vue';
import BaseButton from '@/components/BaseButton.vue';

const props = withDefaults(
	defineProps<{
		open: boolean;
		title: string;
		itemName?: string;
		confirmLabel?: string;
		cancelLabel?: string;
	}>(),
	{
		confirmLabel: 'Confirm',
		cancelLabel: 'Cancel',
	},
);

const emit = defineEmits<{
	confirm: [];
	cancel: [];
}>();

const cancel = () => {
	emit('cancel');
};

const confirm = () => {
	emit('confirm');
};

const dialog = ref<HTMLDialogElement | null>(null);

const titleId = useId();
const descriptionId = useId();

watch(
	() => props.open,
	(open) => {
		if (open) {
			dialog.value?.showModal();
		} else {
			dialog.value?.close();
		}
	},
	{ immediate: true, flush: 'post' },
);

// Handle click on the backdrop (outside the dialog content)
const onBackdropClick = (event: MouseEvent) => {
	if (event.target === dialog.value) {
		emit('cancel');
	}
};
</script>

<template>
	<dialog ref="dialog"
		:aria-labelledby="titleId"
		:aria-describedby="descriptionId"
		class="w-full max-w-md p-0 text-gray-900 bg-white border border-gray-200 rounded-2xl dark:text-gray-100 dark:bg-slate-900 dark:border-gray-800 backdrop:bg-black/60"
		@cancel.prevent="cancel"
		@click="onBackdropClick"
	>
		<div class="p-6">
			<h2 :id="titleId" class="text-xl font-bold text-gray-900 dark:text-white">
				{{ title }}
			</h2>

			<p :id="descriptionId" class="mt-2 text-gray-600 dark:text-gray-300">
				<!-- prettier-ignore -->
				<template v-if="itemName">
					Are you sure you want to delete
					<span class="font-semibold text-gray-900 dark:text-white">{{ itemName }}</span>?
				</template>

				<template v-else>
					Are you sure?
				</template>

				This action cannot be undone.
			</p>

			<div class="flex justify-end gap-3 mt-4">
				<BaseButton variant="outline" @click="cancel">
					{{ cancelLabel }}
				</BaseButton>
				<BaseButton variant="danger" @click="confirm">
					{{ confirmLabel }}
				</BaseButton>
			</div>
		</div>
	</dialog>
</template>
