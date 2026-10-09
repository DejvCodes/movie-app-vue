import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
	},

	{
		name: 'app/files-to-ignore',
		ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
	},

	pluginVue.configs['flat/recommended'],
	vueTsConfigs.recommended,

	{
		name: 'app/rules',
		rules: {
			// Optional TypeScript props are undefined by default, no need for an explicit default
			'vue/require-default-prop': 'off',
		},
	},

	skipFormatting,
);
