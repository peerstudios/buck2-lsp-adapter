import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/extension.ts"],
  external: ["vscode"],
  noExternal: ["vscode-languageclient"],
  sourcemap: true,

  // For production:
  terserOptions: {
    compress: {
      drop_console: true,
    },

    mangle: {
      properties: {
        regex: /^_/,
      },
    },

    format: {
      comments: false,
    },

    ecma: 2019,
  },

  dts: false,
  clean: true,
});
