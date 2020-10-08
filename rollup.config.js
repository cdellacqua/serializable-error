import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';
import {terser} from "rollup-plugin-terser";

export default {
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true,
		},
		{
			file: pkg.browser,
			format: 'iife',
			name: 'SerializableError',
		}
	],
	external: Object.keys(pkg.dependencies || {}),
	plugins: [
		typescript(),
		terser(),
	]
};