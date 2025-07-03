export default (r: Request) => {
    const url = new URL(r.url).origin + "/gds";
    return new Response(url);
};
