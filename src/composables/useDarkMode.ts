import { readonly, ref, watchEffect } from 'vue';

const STORAGE_KEY = 'theme';

// Saved choice wins, otherwise follow the system preference
const getInitialValue = () => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return stored === 'dark';
		}
	} catch {
		// localStorage is unavailable, fall back to the system preference
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const isDark = ref(getInitialValue());

watchEffect(() => {
	document.documentElement.classList.toggle('dark', isDark.value);
});

export const useDarkMode = () => {
	const toggleDarkMode = () => {
		isDark.value = !isDark.value;

		try {
			localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
		} catch {
			// localStorage is unavailable, the choice lasts until reload
		}
	};

	return {
		isDark: readonly(isDark),
		toggleDarkMode,
	};
};
