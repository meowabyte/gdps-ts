import handleRegister from "../../util/handleRegister";
import { query } from "../../util/http";

export default async (r: Request) => {
    const { userName: username, password, email } = await query(r);

    const { ok, code } = await handleRegister({ username, password, email });
    return new Response(`${code}`, {
        status: ok ? 200 : 400,
    });
};
