<script setup lang="ts">
type Variant = 'primary' | 'outline' | 'danger';

withDefaults(
	defineProps<{
		variant?: Variant;
		type?: 'button' | 'submit' | 'reset';
	}>(),
	{
		variant: 'primary',
		type: 'button',
	},
);

const variantClasses: Record<Variant, string> = {
	primary: 'text-white bg-indigo-500 shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 focus-visible:ring-indigo-300',
	outline: 'text-gray-700 border border-gray-300 hover:bg-gray-100 focus-visible:ring-indigo-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-800',
	danger: 'text-white bg-red-600 shadow-lg shadow-red-600/30 hover:bg-red-500 focus-visible:ring-red-300',
};
</script>

<template>
	<button
		:type="type"
		:class="[
			'flex items-center gap-2 px-4 py-2 text-sm font-semibold transition rounded-lg focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none',
			variantClasses[variant],
		]"
	>
		<slot />
	</button>
</template>
