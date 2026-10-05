import HomePage from '../pages/HomePage.vue';
import MovieDetailPage from '../pages/MovieDetailPage.vue';
import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
	history: createWebHistory(),

	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
		},
		{
			path: '/:id',
			name: 'movie',
			component: MovieDetailPage,
			props: (route) => ({ id: Number(route.params.id) }),
		},
	],
});

export default router;
