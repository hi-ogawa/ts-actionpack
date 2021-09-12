# TS Action Pack

Tiny library to help writing ["one controller instance per request"](https://github.com/typestack/routing-controllers/issues/174) style backend in typescript.

This library includes:

- [Type-safe DSL to define routes](src/router-utils.ts)
- [Base controller class](src/base-controller.ts)
- [Utility to reuse middleware ecosystem](src/middleware-utils.ts)

The aim is to provide something simple but type-safe equivalent of [Ruby on Rails Action Pack](https://github.com/rails/rails/blob/main/actionpack/README.rdoc).

## Usage

```typescript
import * as express from "express";
import { makeRouterDSL, BaseController } from "ts-actionpack";

// Define controller
class HomeController extends BaseController {
  index() {
    this.res.send("Hello");
  }
  show() {
    this.res.send(`Hello: id = ${this.req.params.id}`);
  }
}

// Define router
const router = express.Router();
const { GET } = makeRouterDSL(router);

GET("/", HomeController, "index");
GET("/:id", HomeController, "show");

// Use router
const app = express();
app.use(router);
app.listen(8080);
```

## Examples

Via controller inheritance, it's easy to extend functionalities e.g.

- [Helper function to format response](tests/examples/ex01-inheritance/controllers/home.ts)
- [Action callback](tests/examples/ex03-callback/controllers/home.ts)
- [Authentication](tests/examples/ex03-callback/controllers/home.ts)
- [Handling multipart/form-data](tests/examples/ex02-promisify-middleware/controllers/home.ts)
- [Handling error](tests/examples/ex04-validation/controllers/application.ts)
- [Parameter validation](tests/examples/ex04-validation/controllers/home.ts)

See more examples at [tests/examples](tests/examples).

## Development

```
# Development
npm install
npm run build -- -w

# Run example
npm run example -- ex00-simple

# Testing
npm run test

# Formating
npm run format

# Publish
npm run deploy
```
