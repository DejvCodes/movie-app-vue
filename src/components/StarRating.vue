<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid';

const MAX_RATING = 5;

withDefaults(
	defineProps<{
		rating: number;
		readonly?: boolean;
		label?: string;
	}>(),
	{
		readonly: false,
	},
);

const emit = defineEmits<{
	rate: [rating: number];
}>();

const starClass = (star: number, rating: number) => {
	return ['w-5 h-5', star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'];
};
</script>

<template>
	<div
		v-if="readonly"
		class="flex gap-0.5"
		aria-hidden="true"
	>
		<StarIcon
			v-for="star in MAX_RATING"
			:key="star"
			:class="starClass(star, rating)"
		/>
	</div>

	<div
		v-else
		class="flex gap-0.5"
		role="group"
		:aria-label="label"
	>
		<button
			v-for="star in MAX_RATING"
			:key="star"
			type="button"
			class="cursor-pointer disabled:cursor-default"
			:aria-label="`Rate ${star} of ${MAX_RATING}`"
			:disabled="star === rating"
			@click="emit('rate', star)"
		>
			<StarIcon
				:class="starClass(star, rating)"
				aria-hidden="true"
			/>
		</button>
	</div>
</template>
