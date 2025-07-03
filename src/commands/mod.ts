import { Account } from "../util/db";
import { ModLevel } from "../util/decoder/user";

export default async (args: string[], account: Account) => {
    if (account.modLevel === null || account.modLevel === ModLevel.NONE)
        return false;

    if (args.length < 2) return "Usage: <username> <level>";

    const [username, level] = args as [string, string],
        validLevels = Object.keys(ModLevel).filter((k) => !/\d+/.test(k));

    if (!validLevels.includes(level))
        return `Invalid mod level! (${level}), valid values: ${validLevels.join(
            ", "
        )}`;

    const self = username.toLowerCase() === account.username.toLowerCase();
    const target = self
        ? account
        : await Account.findOne({ where: { username } });
    if (!target) return `Could not find user "${username}"!`;

    target.modLevel = ModLevel[level as keyof typeof ModLevel];
    target.save();

    return `${username} is now ${level}!`;
};
