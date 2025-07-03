import { SHA1 } from "bun";
import XOR, { Keys } from "../util/decoder/xor";
import { authOnly, query } from "../util/http";
import { config } from "../util/config";
import { randNum } from "../util";

enum RewardType {
    INFO = "0",
    OPEN_SMALL = "1",
    OPEN_LARGE = "2",
}
type Query = {
    chk: string;
    rewardType: RewardType;
    udid: string;
};

const {
    largeChestDelay,
    smallChestDelay,
    drop: { large, small, shardChance },
} = config.dailyChest;

const randomShard = () =>
    Math.round(Math.random() * 100) < shardChance ? randNum(1, 10) : 0;

/** @see https://wyliemaster.github.io/gddocs/#/endpoints/rewards/getGJRewards?id=response */
export default authOnly(async (r, account) => {
    const {
        chk,
        rewardType = RewardType.INFO,
        udid = "",
    } = (await query(r)) as Partial<Query>;
    if (!chk) return new Response("-1", { status: 400 });

    const timeNow = Math.round(Date.now() / 1000);
    let smallTimeLeft = Math.max(
        0,
        account.user.lastSmallChest +
            config.dailyChest.smallChestDelay -
            timeNow
    );
    let largeTimeLeft = Math.max(
        0,
        account.user.lastLargeChest +
            config.dailyChest.largeChestDelay -
            timeNow
    );

    if (rewardType !== RewardType.INFO) {
        if (rewardType === RewardType.OPEN_SMALL && smallTimeLeft === 0) {
            account.user.lastSmallChest = timeNow;
            account.user.smallChestCount++;
            smallTimeLeft = config.dailyChest.smallChestDelay;
            await account.user.save();
        } else if (
            rewardType === RewardType.OPEN_LARGE &&
            largeTimeLeft === 0
        ) {
            account.user.lastLargeChest = timeNow;
            account.user.largeChestCount++;
            largeTimeLeft = config.dailyChest.largeChestDelay;
            await account.user.save();
        } else return new Response("-1", { status: 404 });
    }

    const smallChest = [
        randNum(...small.orb), // orbs
        randNum(...small.diamond), // diamonds
        randomShard(), // Item 1
        randomShard(), // item 2
    ];

    const largeChest = [
        randNum(...large.orb), // orbs
        randNum(...large.diamond), // diamonds
        randomShard(), // Item 1
        randomShard(), // item 2
    ];

    const attr = [
        1,
        account.user.id,
        XOR.decode(
            Buffer.from(chk.slice(5), "base64url").toString("utf-8"),
            Keys.CHEST_REWARDS,
            true
        ),
        udid,
        account.id,
        smallTimeLeft, // small chest time remaining
        smallChest.join(","),
        account.user.smallChestCount, // small chests claimed
        largeTimeLeft, // large chest time remaining
        largeChest.join(","),
        account.user.largeChestCount, // large chests claimed
        rewardType,
    ].join(":");

    const xor = Buffer.from(
        XOR.encode(attr, Keys.CHEST_REWARDS, true)
    ).toString("base64url");

    const hash = new SHA1().update(xor + "pC26fpYaQCtg").digest("hex");
    return new Response(`aaaaa${xor}|${hash}`);
}, true);
