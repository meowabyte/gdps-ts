import { Account } from "./db";
import GJP2, { Salts } from "./decoder/gjp2";

const USERNAME_REGEX = /^\w{3,20}$/;
const PASSWORD_REGEX = /^.{6,64}$/;

type RegisterOptions = {
    username: string;
    password: string;
    email: string;
};

export enum RegisterCodes {
    OK = 1,
    GENERIC_ERROR = -1,
    USERNAME_TAKEN = -2,
    USERNAME_SHORT = -9,
    PASSWORD_INVALID = -5,
}

type RegisterResult = { code: RegisterCodes } & (
    | { ok: true; account: Account }
    | { ok: false }
);

// CURRENTLY NOT USING EMAIL TO ANYTHING
export default async function handleRegister({
    username,
    password,
    email,
}: Partial<RegisterOptions>): Promise<RegisterResult> {
    if (!username || !password || !email)
        return { ok: false, code: RegisterCodes.GENERIC_ERROR }; // (generic)
    if (!USERNAME_REGEX.test(username))
        return { ok: false, code: RegisterCodes.USERNAME_SHORT }; // (username too short)
    if (!PASSWORD_REGEX.test(password))
        return { ok: false, code: RegisterCodes.PASSWORD_INVALID }; // (invalid password)

    try {
        const existing = await Account.count({ where: { username } });
        if (existing > 0)
            return { ok: false, code: RegisterCodes.USERNAME_TAKEN };

        const account = await Account.create(
            {
                username,
                gjp2: GJP2.encode(password, Salts.GJP2),
                user: {},
            },
            { include: "user" }
        );
        return { ok: true, code: RegisterCodes.OK, account };
    } catch (e) {
        console.error(`Error when creating user ${username}: `, e);
        return { ok: false, code: RegisterCodes.GENERIC_ERROR };
    }
}
