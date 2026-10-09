<script setup lang="ts">
withDefaults(
	defineProps<{
		title: string;
		description?: string;
		headingTag?: 'h1' | 'h2' | 'h3';
	}>(),
	{
		headingTag: 'h2',
	},
);
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center border border-gray-300 border-dashed rounded-xl dark:border-gray-700">
		<div
			v-if="$slots.icon"
			class="text-gray-400 dark:text-gray-500"
		>
			<slot name="icon" />
		</div>
		<component
			:is="headingTag"
			class="text-lg font-semibold text-gray-900 dark:text-white"
		>
			{{ title }}
		</component>
		<p
			v-if="description"
			class="text-sm text-gray-500 dark:text-gray-400"
		>
			{{ description }}
		</p>
		<slot />
	</div>
</template>
