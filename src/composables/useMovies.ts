import { ref, watch } from 'vue';
import data from '@/data.json';
import type { Movie, MovieFormData } from '@/types/movie';

const STORAGE_KEY = 'movies';

const loadMovies = (): Movie[] => {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			return JSON.parse(saved);
		}
	} catch {
		// localStorage is unavailable or the saved value is broken
	}

	return JSON.parse(JSON.stringify(data.items));
};

const movies = ref<Movie[]>(loadMovies());

// Save movies to localStorage whenever they change
watch(
	movies,
	() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(movies.value));
		} catch {
			// localStorage is unavailable, changes last until reload
		}
	},
	{ deep: true },
);

export const useMovies = () => {
	// Find a movie by its id
	const getMovie = (id: number) => {
		return movies.value.find((movie) => movie.id === id);
	};

	// Set a new rating for a single movie
	const updateRating = (id: number, rating: number) => {
		const movie = getMovie(id);
		if (movie) {
			movie.rating = rating;
		}
	};

	// Reset ratings of all movies to 0
	const removeAllRatings = () => {
		movies.value.forEach((movie) => {
			movie.rating = 0;
		});
	};

	// Delete a movie from the list
	const removeMovie = (id: number) => {
		movies.value = movies.value.filter((movie) => movie.id !== id);
	};

	// Add a new movie with the next free id
	const addMovie = (data: MovieFormData) => {
		const id = Date.now();
		movies.value.push({ id, ...data });
	};

	// Replace the details of an existing movie
	const updateMovie = (id: number, data: MovieFormData) => {
		const movie = getMovie(id);
		if (movie) {
			Object.assign(movie, data);
		}
	};

	return {
		movies,
		getMovie,
		addMovie,
		updateMovie,
		updateRating,
		removeAllRatings,
		removeMovie,
	};
};
