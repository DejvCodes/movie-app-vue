<script setup lang="ts">
import { useToast } from '../composables/useToast';

const { message, visible } = useToast();
</script>

<template>
	<div
		role="status"
		aria-live="polite"
		:class="[
			'fixed z-50 flex items-center gap-2.5 px-5 py-3.5 text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg top-6 right-6 dark:text-gray-100 dark:bg-slate-900 dark:border-gray-700 transition-all duration-300',
			visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none',
		]">
		<div class="w-2 h-2 bg-indigo-500 rounded-full dark:bg-indigo-400" />
		<span class="text-sm font-medium">
			{{ message }}
		</span>
	</div>
</template>
