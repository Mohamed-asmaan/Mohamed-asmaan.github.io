import { copyFileSync, cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const sourceHtml = path.resolve("index.source.html");

function githubUserPages(): Plugin {
  return {
    name: "github-user-pages",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/" && url !== "/index.html") {
          next();
          return;
        }
        void server.transformIndexHtml(url ?? "/", readFileSync(sourceHtml, "utf8")).then((html) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(html);
        });
      });
    },
    closeBundle() {
      const docs = path.resolve("docs");
      const built = existsSync(path.join(docs, "index.source.html"))
        ? path.join(docs, "index.source.html")
        : path.join(docs, "index.html");
      copyFileSync(built, path.join(docs, "index.html"));
      copyFileSync(built, path.resolve("index.html"));
      copyFileSync(built, path.resolve("404.html"));
      writeFileSync(path.resolve(".nojekyll"), "");
      writeFileSync(path.join(docs, ".nojekyll"), "");
      const assetsDest = path.resolve("assets");
      if (existsSync(assetsDest)) {
        rmSync(assetsDest, { recursive: true, force: true });
      }
      cpSync(path.join(docs, "assets"), assetsDest, { recursive: true });
      for (const file of ["favicon.ico", "profile.png"]) {
        const from = path.join(docs, file);
        if (existsSync(from)) copyFileSync(from, path.resolve(file));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), githubUserPages()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      input: sourceHtml,
    },
  },
});
