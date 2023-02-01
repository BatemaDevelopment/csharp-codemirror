import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
  input: "src/bundles/mergedScripts.js",
  output: {
    name: "full",
    file: "src/bundles/bundle.mergedScripts.js",
    format: "iife"
  },
  plugins: [nodeResolve()]
};