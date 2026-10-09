<script setup lang="ts">
import { ref } from 'vue';
import { StarIcon } from '@heroicons/vue/24/solid';

const MAX_RATING = 5;

const props = withDefaults(
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

const hoveredStar = ref<number>(0);

const starClass = (star: number, rating: number) => {
	return ['w-5 h-5', star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'];
};

const rate = (star: number) => {
	emit('rate', star === props.rating ? 0 : star);
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
		@mouseleave="hoveredStar = 0"
	>
		<button
			v-for="star in MAX_RATING"
			:key="star"
			type="button"
			class="cursor-pointer"
			:aria-label="star === rating ? 'Remove rating' : `Rate ${star} of ${MAX_RATING}`"
			@mouseenter="hoveredStar = star"
			@click="rate(star)"
		>
			<StarIcon
				:class="starClass(star, hoveredStar || rating)"
				aria-hidden="true"
			/>
		</button>
	</div>
</template>
