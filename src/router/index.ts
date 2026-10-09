import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import MovieDetailPage from '@/pages/MovieDetailPage.vue';
import { APP_TITLE } from '@/constants';

// Extend the RouteMeta interface to include an optional title property
declare module 'vue-router' {
	interface RouteMeta {
		title?: string;
	}
}

const router = createRouter({
	history: createWebHistory(),

	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
			meta: { title: APP_TITLE },
		},
		{
			path: '/movies/:id(\\d+)',
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

router.afterEach((to) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
});

export default router;
