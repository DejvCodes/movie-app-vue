<script setup lang="ts">
import { computed } from 'vue';
import { StarIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
	rating: number;
}>();

const notRated = computed(() => Boolean(!props.rating));
</script>

<template>
	<span
		:class="[
			'flex items-center gap-1 px-2.5 py-1 text-sm font-semibold border rounded-full bg-gray-900/80',
			notRated ? 'border-gray-600 text-gray-400' : 'border-yellow-500/40 text-yellow-400',
		]"
	>
		<StarIcon
			class="w-3.5 h-3.5"
			aria-hidden="true"
		/>
		{{ notRated ? '–' : rating }}
	</span>
</template>
