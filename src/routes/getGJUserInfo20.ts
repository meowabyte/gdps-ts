import { Account, User } from "../util/db";
import UserObject, { FriendState } from "../util/decoder/user";
import { checkAuth, query } from "../util/http";

export default async (r: Request) => {
    const { targetAccountID, accountID, gjp2 } = await query(r);
    if (!targetAccountID && !accountID)
        return new Response("-1", { status: 400 });

    const self = !!accountID && !!gjp2 && targetAccountID === accountID;

    const account = (
        self
            ? await checkAuth(accountID, gjp2, true)
            : await Account.findOne({
                  where: { id: targetAccountID },
                  include: "user",
              })
    ) as (Account & { user: User }) | null;

    if (!account) return new Response("-1", { status: 400 });

    const {
        accBall,
        accBird,
        accDart,
        accExplosion,
        accGlow,
        accIcon,
        accJetpack,
        accRobot,
        accShip,
        accSpider,
        accSwing,
        accountId,
        color,
        classicLevels,
        color2,
        color3,
        commentHistoryState,
        creatorPoints,
        demonLevels,
        diamonds,
        friendsState,
        iconType,
        id,
        rank,
        platformerLevels,
        messageState,
        moons,
        specialId,
        stars,
        youtube,
        twitch,
        twitter,
        userCoins,
        secretCoins,
        showcaseIconId,
    } = account.user;
    const { modLevel, username } = account;

    const obj = UserObject.encode({
        isRegistered: true,
        userCoins,
        secretCoins,
        iconType,
        platformerLevels,
        messageState,
        moons,
        special: specialId,
        stars,
        youtube: youtube ?? undefined,
        twitch: twitch ?? undefined,
        twitter: twitter ?? undefined,
        userId: id,
        accBall,
        accBird,
        accDart,
        accExplosion,
        accGlow,
        accIcon,
        accJetpack,
        accRobot,
        accShip,
        accSpider,
        accSwing,
        classicLevels,
        color,
        color2,
        color3,
        commentHistoryState,
        creatorPoints,
        demons: demonLevels.reduce((a, b) => a + b, 0),
        demonLevels,
        diamonds,
        friendsState,
        globalRank: rank,
        ranking: rank,
        iconId: showcaseIconId,
        modLevel: modLevel ?? undefined,
        username,
        ...(self
            ? {
                  // FRIEND && MESSAGE SYSTEM
                  accountId,
                  accountHighlight: accountId,
                  friendRequests: 0,
                  messages: 0,
                  newFriendRequest: false,
                  newFriends: 0,
              }
            : { friendState: FriendState.NONE }),
    });

    return new Response(obj);
};
