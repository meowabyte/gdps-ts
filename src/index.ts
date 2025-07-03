// preloads to fix race condition
import "../gdps.config.ts";
import "./util/http";

import { Glob } from "bun";
import { basename, dirname, join } from "path";
import type { HandlerType } from "./types/http";
import { IS_DEV, ROOT_PATH } from "./util";
import handleRouteStub from "./util/handleRouteStub";
import redirectRoutes from "./routes/_/redirects.ts";

const ROUTES_PATH = join(import.meta.dir, "routes");
const STATIC_PATH = join(ROOT_PATH, "static");

const routes = new Map<string, HandlerType>(
    (await Promise.all(
        Array.from(new Glob("**/*.ts").scanSync(ROUTES_PATH))
            .filter(
                (r) =>
                    !basename(r).startsWith("_") && !dirname(r).startsWith("_")
            )
            .map(async (route) => [
                route.replace(/ts$/, "php"),
                await import(join(ROUTES_PATH, route)).then((m) => m.default),
            ])
    )) as any
);

const staticRoutes = await Promise.all(
    Array.from(new Glob("**/*.html").scanSync(STATIC_PATH)).map(
        async (route) => [
            `/${route.replace(/\.html$/i, "")}`,
            await import(join(STATIC_PATH, route)).then((m) => m.default),
        ]
    )
).then((r) => r.reduce((o, [route, v]) => ({ ...o, [route]: v }), {}));

Bun.serve({
    port: 1337,
    routes: {
        ...staticRoutes,
        "/gds/*": async (req: Bun.BunRequest<"/gds/*">) => {
            const route = new URL(req.url).pathname.replace(
                /^\/gds\/(?:database\/)?/,
                ""
            );

            if (redirectRoutes[route])
                return Response.redirect(redirectRoutes[route]);
            if (!routes.has(route)) {
                if (IS_DEV) return handleRouteStub(req);
                return new Response("-1");
            }

            const v = routes.get(route)!;
            return typeof v !== "function"
                ? v ?? new Response(null, { status: 404 })
                : (await v(req)) ?? new Response("-1");
        },
    },
    error(error) {
        console.error(error);
        return new Response("-1", { status: 500 });
    },
});

console.log(
    `${routes.size} route(s) ready! (incl. ${
        Object.keys(staticRoutes).length
    } static)`
);
