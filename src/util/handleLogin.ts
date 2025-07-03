import { Account, User } from "./db";

export enum LoginCodes {
    GENERIC_ERROR = -1,
    PASSWORD_SHORT = -8,
    USERNAME_SHORT = -9,
    PASSWORD_INVALID = -5,
    LOGIN_INVALID = -11,
    LOGIN_DISABLED = -12,
}

type LoginOptions = { username: string; gjp2: string };
type LoginResponse =
    | { ok: true; id: [number, number] }
    | { ok: false; code: LoginCodes };

export default async function handleLogin({
    username,
    gjp2,
}: Partial<LoginOptions>): Promise<LoginResponse> {
    if (!username || !gjp2)
        return { ok: false, code: LoginCodes.GENERIC_ERROR };

    const acc = (await Account.findOne({
        where: { username, gjp2 },
        include: "user",
    })) as Account & { user: User };

    if (!acc) return { ok: false, code: LoginCodes.LOGIN_INVALID };
    if (acc.banned) return { ok: false, code: LoginCodes.LOGIN_DISABLED };

    // ensure user exists (if it doesn't for whatever reason)
    if (!acc.user) acc.user = await User.create({ accountId: acc.id });

    return { ok: true, id: [acc.id, acc.user.id] };
}
