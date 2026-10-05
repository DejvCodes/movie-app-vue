<script setup lang="ts">
type Variant = 'primary' | 'outline';

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
	primary: 'bg-indigo-500 shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 focus-visible:ring-indigo-300',
	outline: 'border border-gray-600 hover:bg-gray-800 focus-visible:ring-indigo-400',
};
</script>

<template>
	<button
		:type="type"
		:class="[
			'flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition rounded-lg focus:outline-none focus-visible:ring-2',
			variantClasses[variant],
		]"
	>
		<slot />
	</button>
</template>
