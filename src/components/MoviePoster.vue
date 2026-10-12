<script setup lang="ts">
import { ref, watch } from 'vue';
import { PhotoIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
	src: string;
	alt: string;
}>();

const hasError = ref<boolean>(false);

// Try to load the image again when its URL changes
watch(
	() => props.src,
	() => {
		hasError.value = false;
	},
);
</script>

<template>
	<img
		v-if="!hasError"
		:src="src"
		:alt="alt"
		width="800"
		height="1040"
		@error="hasError = true"
	/>

	<!-- Fallback when the image fails to load -->
	<div
		v-else
		role="img"
		:aria-label="alt"
		class="flex items-center justify-center text-gray-400 bg-gray-200 dark:text-gray-500 dark:bg-gray-800"
	>
		<PhotoIcon
			class="w-12 h-12"
			aria-hidden="true"
		/>
	</div>
</template>
