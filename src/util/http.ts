import type { AuthedHandlerType, HandlerType } from "../types/http";
import { Account } from "./db";

export const checkAuth = async (
    id: string,
    gjp2: string,
    withUser?: boolean
): Promise<Account | null> => {
    if (!id || !gjp2) return null;

    // TODO: redis integration for recent authed requests
    const existing = await Account.findOne({
        where: { id, gjp2 },
        include: withUser ? ["user"] : [],
    });
    if (!existing || existing.banned) return null;

    return existing;
};

/** Wrapper for route handler for checking if user's logged in */
export const authOnly =
    async (cb: AuthedHandlerType, withUser?: boolean): Promise<HandlerType> =>
    async (r: Request) => {
        const { accountID, gjp2 } = await query(r.clone() as Request);
        if (!accountID || !gjp2) return new Response("-1", { status: 401 });

        const account = await checkAuth(accountID, gjp2, withUser);
        if (!account) return new Response("-1", { status: 401 });

        return typeof cb === "function" ? cb(r, account) : cb;
    };

/** Parse query from GET query or POST body */
export const query = async (r: Request) => {
    if (["GET", "OPTIONS", "HEAD"].includes(r.method))
        return Object.fromEntries(new URL(r.url).searchParams);
    return Object.fromEntries(new URLSearchParams(await r.text()));
};
