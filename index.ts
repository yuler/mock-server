import fs from "node:fs/promises";
import express from "express";

(async function main() {
  const files = await fs.readdir(__dirname);
  const apis = files.filter((file) => file.startsWith("api"));

  const app = express();

  app.get("/", (req, res) => {
    res.send("Hi mock server!");
  });

  for (const api of apis) {
    console.log(`./${api}`);
    const routes = require(`./${api}`).default;
    for (const [route, body] of Object.entries<string>(routes)) {
      let [method, path] = route.split(/\s/);

      if (!path) {
        path = method;
        method = "all";
      }
      method = method.toLowerCase();

      console.log(method, path, body);

      app[method](path, (_req, res) => {
        res.json(body);
      });
    }
  }

  app.listen(3000, () => {
    console.log("Mock server host http://localhost:3000");
  });
})();
