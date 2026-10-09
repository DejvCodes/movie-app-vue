import { readonly, ref, watchEffect } from 'vue';

const STORAGE_KEY = 'theme';

// Saved choice wins, otherwise dark by default
const getInitialValue = () => {
	try {
		return localStorage.getItem(STORAGE_KEY) !== 'light';
	} catch {
		// localStorage is unavailable, fall back to dark
		return true;
	}
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
