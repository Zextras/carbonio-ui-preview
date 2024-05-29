/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
 	env: { "es6": true },
	root: true,
	extends: ['./node_modules/@zextras/carbonio-ui-configs/rules/eslint.js'],
	plugins: ['notice'],
	overrides: [
		{
			files: ['**/tests/*'],
			extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
			rules: {
				'import/no-extraneous-dependencies': 'off'
			}
		}
	],
	rules: {
		'notice/notice': [
			'error',
			{
				templateFile: './notice.template.ts'
			}
		],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: [".js", ".ts", ".ts", ".tsx"],
			}
		}
	},
	ignorePatterns: ['notice.template.ts'],
	parserOptions: {
		 sourceType: "module",
	}
};
