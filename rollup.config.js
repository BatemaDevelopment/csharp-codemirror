import { nodeResolve } from "@rollup/plugin-node-resolve"
export default {
  input: "dist/editor.js",
  output: {
    file: "src/bundles/editor.bundle.js",
    format: "iife"
  },
  plugins: [nodeResolve()]
}