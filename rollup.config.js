import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
  input: "src/bundles/full.bundle.js",
  output: {
    name: "full",
    file: "src/bundles/full.rollup.bundle.js",
    format: "iife"
  },
  plugins: [nodeResolve()]
};