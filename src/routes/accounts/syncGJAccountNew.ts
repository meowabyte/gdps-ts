import { load } from "../../util/backup";
import { query, authOnly } from "../../util/http";

const listStub = "0".repeat(40);

export default authOnly(async (r) => {
    const { accountID } = await query(r);
    if (!accountID) return new Response("-1", { status: 400 });

    const id = parseInt(accountID);
    if (isNaN(id)) return new Response("-1", { status: 400 });

    const result = await load({ id });
    if (!result) return new Response("-1", { status: 400 });

    return new Response(result + `;${listStub};${listStub}`);
});
