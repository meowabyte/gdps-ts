import { authOnly, query } from "../../util/http";
import { save } from "../../util/backup";

export default authOnly(async (r) => {
    const { accountID, gameVersion, binaryVersion, saveData } = await query(r);
    if (!accountID || !gameVersion || !binaryVersion || !saveData)
        return new Response("-1", { status: 400 });

    const gv = parseInt(gameVersion),
        bv = parseInt(binaryVersion);

    if (isNaN(gv) || isNaN(bv)) return new Response("-1", { status: 400 });

    const result = await save({
        id: parseInt(accountID),
        gameVersion: gv,
        binaryVersion: bv,
        saveData,
    });

    return new Response(result ? "1" : "-1", { status: result ? 200 : 400 });
});
