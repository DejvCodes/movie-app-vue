import { readonly, ref } from 'vue';

const DURATION = 3000;

const message = ref('');
const visible = ref(false);

let timeout: ReturnType<typeof setTimeout> | undefined;

export const useToast = () => {
	const showToast = (text: string) => {
		message.value = text;
		visible.value = true;

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			visible.value = false;
		}, DURATION);
	};

	return {
		message: readonly(message),
		visible: readonly(visible),
		showToast,
	};
};
