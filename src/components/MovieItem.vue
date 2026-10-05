<script setup lang="ts">
import {StarIcon} from '@heroicons/vue/24/solid';
import MovieStarRating from './MovieStarRating.vue';

export interface Movie {
	id: number;
	title: string;
	image: string;
	genres: string[];
	description: string;
	rating: number;
}

defineProps<{
	movie: Movie;
}>();
</script>

<template>
	<article class="flex flex-col overflow-hidden border border-gray-800 rounded-2xl bg-slate-900">
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
			<h2 class="text-2xl font-bold text-white">
				{{ movie.title }}
			</h2>
			<ul class="flex flex-wrap gap-2 mt-3">
				<li
					v-for="genre in movie.genres"
					:key="genre"
					class="px-3 py-0.5 text-sm rounded-full bg-indigo-900/60 text-indigo-200"
				>
					{{ genre }}
				</li>
			</ul>

			<p class="my-4 leading-relaxed text-gray-300">
				{{ movie.description }}
			</p>

			<div class="flex items-center justify-between pt-4 mt-auto border-t border-gray-800">
				<div class="flex items-center gap-2 text-sm text-gray-300">
					<span>Rating ({{ movie.rating }}/5)</span>
					<div class="flex gap-0.5">
						<StarIcon
							v-for="star in 5"
							:key="star"
							:class="['w-4 h-4', star <= movie.rating ? 'text-yellow-400' : 'text-gray-600']"
							aria-hidden="true"
						/>
					</div>
				</div>

				<div class="flex gap-2">
					<button
						type="button"
						class="flex items-center justify-center w-10 h-10 text-indigo-300 transition rounded-lg bg-indigo-900/60 hover:bg-indigo-800"
						aria-label="Edit movie"
					>
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
						</svg>
					</button>
					<button
						type="button"
						class="flex items-center justify-center w-10 h-10 text-red-400 transition rounded-lg bg-red-900/40 hover:bg-red-900/70"
						aria-label="Delete movie"
					>
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</article>
</template>
