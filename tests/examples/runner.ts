import * as path from "path";
import * as morgan from "morgan";
import * as express from "express";

const app = express();
app.use(morgan("combined"));

function main() {
  const name = process.argv[2];
  const appPath = path.resolve(__dirname, name, "app.js");

  const example = require(appPath);
  app.use(example.app);

  const port = process.env.PORT || "8080";
  app.listen(port, () => {
    console.log(`[run-app.ts] Listening at port ${port}`);
  });
}

if (require.main === module) {
  main();
}
