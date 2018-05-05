import babelPlugin from 'rollup-plugin-babel';

const INPUT_FILE = './src/index.js';
const OUTPUT_FILE = 'lib/bundle.umd.js'

export default {
  input: INPUT_FILE,
  output: {
    file: OUTPUT_FILE,
    name: 'ioc',
    format: 'umd',
    sourcemap: true,
    exports: 'named',
  },
  plugins: [
    babelPlugin({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        "@babel/preset-flow",
        ["@babel/preset-env", { modules: false }],
        ["@babel/preset-stage-2", { decoratorsLegacy: true }]
      ]
    }),
  ],
};
