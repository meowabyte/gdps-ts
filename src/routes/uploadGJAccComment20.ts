import handleCommand from "../util/handleCommand";
import { authOnly, query } from "../util/http";

export default authOnly(async (r, account) => {
    const { comment } = await query(r);
    if (!comment) return new Response("-1", { status: 400 });

    const commandResult = await handleCommand(comment, account);
    if (commandResult)
        return new Response(
            typeof commandResult === "string"
                ? `temp__${commandResult}\n\n<cr>[GDPS RESPONSE]</c>`
                : "-1"
        );

    return new Response("0");
});
