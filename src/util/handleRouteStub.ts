const reqToBoomlings = ({ url: u, body, headers, method }: Request) => {
    const url = new URL(u);

    url.protocol = "https:";
    url.hostname = "www.boomlings.com";
    url.pathname = url.pathname.replace(/^\/gds/i, "");
    url.port = "";

    headers.set("host", "www.boomlings.com");
    headers.set("user-agent", "");

    return new Request(url.toString(), {
        headers,
        method,
        body,
    });
};

export default async (r: Request) => {
    const req = reqToBoomlings(r);

    console.warn(
        [
            "Not implemented route:",
            `${req.method} ${req.url}`,
            ...Array.from(req.headers.entries()).map(([k, v]) => `${k}: ${v}`),
            "",
            await req.clone().text(),
        ].join("\n")
    );

    return new Response("-1", { status: 404 });
};
