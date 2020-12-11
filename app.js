import { Application } from "./deps.js";
import { router } from "./routes/routes.js"

const app = new Application();
app.use(router.routes());
app.listen({port: 7777});

