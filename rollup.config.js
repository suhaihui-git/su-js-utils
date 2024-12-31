import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
      interop: "auto",
    },
    {
      file: "dist/index.esm.js",
      format: "es",
      exports: "named",
      sourcemap: true,
      interop: "auto",
    },
    {
      file: "dist/index.min.js",
      format: "umd",
      name: "suJsUtils",
      exports: "named",
      sourcemap: true,
      interop: "auto",
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
};
