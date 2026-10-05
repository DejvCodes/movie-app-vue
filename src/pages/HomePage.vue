<template>
	<div class="max-w-6xl px-4 py-10 mx-auto text-gray-100">
		<div class="flex flex-wrap items-end justify-between gap-4 mb-8">
			<div>
				<!-- Page header -->
				<h1 class="mb-4 text-4xl font-bold">
					My Movies
				</h1>
				<div class="flex flex-wrap gap-3">
					<div class="rounded-full border border-gray-700 bg-gray-800 px-4 py-1.5 text-sm text-gray-300">
						Total movies
						<span class="ml-1 font-semibold text-white">
							x
						</span>
					</div>
					<div
						class="flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800 px-4 py-1.5 text-sm text-gray-300">
						<StarIcon class="w-4 h-4 text-yellow-400" />
						Average rating
						<span class="ml-1 font-semibold text-white">x
						</span>
					</div>
				</div>
			</div>

			<div class="flex gap-3">
				<!-- Remove Rating button -->
				<BaseButton variant="outline">
					<StarOffIcon class="w-4 h-4" :stroke-width="1.5" />
					Remove Rating
				</BaseButton>

				<!-- Add Movie button -->
				<BaseButton variant="primary">
					<PlusIcon class="w-5 h-5" />
					Add Movie
				</BaseButton>
			</div>
		</div>

		<!-- Movies grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<div v-for="movie in movies" :key="movie.id">
				<!-- MovieItem -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import data from '../data.json';
import {StarOffIcon} from '@lucide/vue';
import {StarIcon} from '@heroicons/vue/24/solid';
import {PlusIcon} from '@heroicons/vue/24/outline';
import BaseButton from '../components/BaseButton.vue';

const movies = ref(data.items);
</script>
