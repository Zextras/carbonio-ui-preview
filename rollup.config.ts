/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { Plugin, RollupOptions, WarningHandlerWithDefault } from 'rollup';
import css from 'rollup-plugin-css-only';
import { dts } from 'rollup-plugin-dts';

const onwarn: WarningHandlerWithDefault = (warning, warn) => {
	if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
		warn(warning);
	}
};

export default [
	{
		onwarn,
		input: 'src/index.ts',
		output: [
			{
				file: './lib/cjs/index.js',
				format: 'cjs',
				sourcemap: true
			},
			{
				file: './lib/esm/index.js',
				format: 'esm',
				sourcemap: true
			}
		],
		plugins: [css() as Plugin, resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })],
		external: ['react', 'react-dom']
	},
	{
		input: 'src/index.ts',
		output: [{ file: 'lib/index.d.ts', format: 'es' }],
		plugins: [dts()]
	}
] satisfies RollupOptions[];
