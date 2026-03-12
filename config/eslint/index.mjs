import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export const baseConfig = (dirname) => tseslint.config(
	// ... общий конфиг
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: dirname,  // передаётся из каждого проекта
			},
		},
	},
);