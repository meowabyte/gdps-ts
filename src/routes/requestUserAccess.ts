import { ModLevel } from "../util/decoder/user";
import { authOnly } from "../util/http";

export default authOnly((_, user) => {
    if (user.modLevel === null || user.modLevel === ModLevel.NONE)
        return new Response("-1", { status: 400 });
    return new Response(`${user.modLevel}`);
});
