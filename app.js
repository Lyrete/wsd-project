import { Application, Session } from "./deps.js";
import { router } from "./routes/routes.js";
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import * as middleware from "./middlewares/middlewares.js";

const app = new Application();

const session = new Session({ framework: "oak" });
await session.init();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {viewRoot: "./views"}));

app.use(session.use()(session));

app.use(middleware.errorMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.authMiddleware);
app.use(middleware.serveStaticFiles);
app.use(router.routes());
app.listen({port: 7777});

export { app };

