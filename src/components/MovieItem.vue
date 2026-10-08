<script setup lang="ts">
import type { Movie } from '../types/movie';
import StarRating from './StarRating.vue';
import MovieStarRating from './MovieStarRating.vue';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
	movie: Movie;
}>();

const emit = defineEmits<{
	rate: [id: number, rating: number];
	delete: [id: number];
}>();

const updateRating = (rating: number) => {
	emit('rate', props.movie.id, rating);
};

const deleteMovie = (id: number) => {
	emit('delete', id);
};
</script>

<template>
	<article class="flex flex-col overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:shadow-none dark:bg-slate-900 dark:border-gray-800">
		<!-- Movie image and rating -->
		<div class="relative">
			<img
				:src="movie.image"
				:alt="movie.title"
				class="object-cover w-full h-60 sm:h-80"
			/>
			<MovieStarRating
				:rating="movie.rating"
				class="absolute top-3 right-3"
			/>
		</div>

		<!-- Movie details -->
		<div class="flex flex-col flex-1 p-5">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white">
				{{ movie.title }}
			</h2>
			<ul class="flex flex-wrap gap-2 mt-3">
				<li
					v-for="genre in movie.genres"
					:key="genre"
					class="px-3 py-0.5 text-sm rounded-full text-indigo-700 bg-indigo-100 dark:bg-indigo-900/60 dark:text-indigo-200"
				>
					{{ genre }}
				</li>
			</ul>

			<p class="my-4 leading-relaxed text-gray-600 text-[15px] dark:text-gray-300">
				{{ movie.description }}
			</p>

			<div class="flex flex-wrap items-center justify-between gap-3 pt-4 mt-auto border-t border-gray-200 dark:border-gray-800">
				<div class="flex flex-col gap-0.5 text-sm text-gray-600 dark:text-gray-300">
					<span class="text-[13px]">Rating ({{ movie.rating }}/5)</span>
					<StarRating
						:rating="movie.rating"
						@rate="updateRating"
					/>
				</div>

				<div class="flex gap-2">
					<button
						type="button"
						class="flex items-center justify-center w-10 h-10 text-indigo-600 transition bg-indigo-100 rounded-lg hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900/60 dark:hover:bg-indigo-800"
						aria-label="Edit movie"
					>
						<PencilIcon class="w-4 h-4" aria-hidden="true" />
					</button>
					<button
						type="button"
						class="flex items-center justify-center w-10 h-10 text-red-600 transition bg-red-100 rounded-lg hover:bg-red-200 dark:text-red-400 dark:bg-red-900/40 dark:hover:bg-red-900/70"
						aria-label="Delete movie"
						@click="deleteMovie(movie.id)"
					>
						<TrashIcon class="w-4 h-4" aria-hidden="true" />
					</button>
					<RouterLink
						:to="{name: 'movie', params: {id: movie.id } }"
						class="flex items-center justify-center w-10 h-10 text-blue-600 transition bg-blue-100 rounded-lg hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/60 dark:hover:bg-blue-800"
						aria-label="Movie detail"
					>
						<EyeIcon class="w-4 h-4" aria-hidden="true" />
					</RouterLink>
				</div>
			</div>
		</div>
	</article>
</template>
