// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  vite: {
    plugins: [
      viteTsConfigPaths({
        projects: ["./tsconfig.json"]
      })
    ]
  }
});
export {
  app_config_default as default
};
