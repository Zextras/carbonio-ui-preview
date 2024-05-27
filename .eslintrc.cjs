/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
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
		'import/no-unresolved': ['error', { commonjs: true }]
	},
	ignorePatterns: ['notice.template.ts']
};
