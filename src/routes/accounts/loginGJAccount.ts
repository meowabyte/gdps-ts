import handleLogin from "../../util/handleLogin";
import { query } from "../../util/http";

export default async (r: Request) => {
    const { userName: username, gjp2 } = await query(r);
    const l = await handleLogin({ username, gjp2 });

    if (l.ok) return new Response([l.id, l.id].join(","), { status: 200 });

    return new Response(`${l.code}`, {
        status: 400,
    });
};
