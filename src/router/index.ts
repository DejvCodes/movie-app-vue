import {createRouter, createWebHistory} from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import MovieDetailPage from '../pages/MovieDetailPage.vue';

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
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			redirect: { name: 'home' },
		},
	],
});

export default router;
