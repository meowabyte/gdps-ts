import { Glob } from "bun";
import type { Account, User } from "./db";
import { join } from "path";
import { SRC_PATH } from ".";
import type { Promisable } from "../types";

const PREFIX = "!" as const;
const COMMANDS_PATH = join(SRC_PATH, "commands");

type CommandData = {
    handler: (args: string[], user: Account) => Promisable<CommandReturn>;
};
const commands = new Map(
    await Promise.all(
        Array.from(new Glob("**/*.ts").scanSync(COMMANDS_PATH)).map<
            Promise<[string, CommandData]>
        >(async (f) => {
            const cmd = f.replace(/\.ts$/, "");
            const handler = await import(join(COMMANDS_PATH, f)).then(
                (m) => m.default
            );

            return [cmd, { handler }];
        })
    )
);

type CommandReturn = boolean | string;
export default async function handleCommand(
    d: string,
    account: Account
): Promise<CommandReturn> {
    let text: string;
    try {
        text = Buffer.from(d, "base64url").toString("utf-8");
    } catch {
        return false;
    }

    if (!text.startsWith(PREFIX)) return false;

    const args = text.split(" ");
    const cmd = args.shift()!.slice(1);

    const data = commands.get(cmd);
    if (!data) return true;

    try {
        const result = await data.handler(args, account);
        return result === false ? true : result;
    } catch (e) {
        console.error(
            `Error executing command "${cmd}" by ${account.username}: `,
            e
        );
        return true;
    }
}
