<script setup lang="ts">
import {ref, watch} from 'vue';
import BaseButton from './BaseButton.vue';

const props = withDefaults(
	defineProps<{
		open: boolean;
		title: string;
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

watch(
	() => props.open,
	(open) => {
		if (open) {
			dialog.value?.showModal();
		} else {
			dialog.value?.close();
		}
	},
);

// Click on the backdrop (outside the dialog content) closes the dialog
const onBackdropClick = (event: MouseEvent) => {
	if (event.target === dialog.value) {
		emit('cancel');
	}
};
</script>

<template>
	<dialog ref="dialog"
		class="w-full max-w-md p-0 text-gray-100 border border-gray-800 rounded-2xl bg-slate-900 backdrop:bg-black/60"
		@cancel.prevent="emit('cancel')"
		@click="onBackdropClick"
	>
		<div class="p-6">
			<h2 class="text-xl font-bold text-white">
				{{ title }}
			</h2>
			<div class="mt-2 text-gray-300">
				<slot />
			</div>

			<div class="flex justify-end gap-3 mt-6">
				<BaseButton
					variant="outline"
					@click="cancel"
				>
					{{ cancelLabel }}
				</BaseButton>
				<BaseButton
					variant="danger"
					@click="confirm"
				>
					{{ confirmLabel }}
				</BaseButton>
			</div>
		</div>
	</dialog>
</template>
