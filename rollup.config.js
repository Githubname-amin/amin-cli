import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js", // 入口文件，确保这个路径是正确的
  output: [
    {
      file: "dist/bundle.cjs.js", // CommonJS 格式
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/bundle.esm.js", // ES模块格式
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/bundle.umd.js", // UMD 格式
      format: "umd",
      name: "web-observer",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      exclude: "node_modules/**", // 排除 node_modules 文件夹
      babelrc: false,
      presets: ["@babel/preset-env"],
    }),
    terser(), // 压缩输出代码
  ],
//   external: ["react", "vue"], // 如果依赖了 React 或 Vue 等外部库，可以在这里列出
};
