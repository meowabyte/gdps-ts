import {
    CommentHistoryState,
    FriendsState,
    MessageState,
} from "../util/decoder/user";
import { authOnly, query } from "../util/http";

export default authOnly(async (r, account) => {
    const { mS, frS, cS, yt, twitter, twitch } = await query(r);

    const newMsgState = typeof mS !== "undefined" ? parseInt(mS) : null;
    const newFriendsState = typeof frS !== "undefined" ? parseInt(frS) : null;
    const newCommentsState = typeof cS !== "undefined" ? parseInt(cS) : null;

    if (
        newMsgState &&
        Object.values(MessageState)
            .filter((v) => typeof v === "number")
            .includes(newMsgState)
    )
        account.user.messageState = newMsgState;
    if (
        newFriendsState &&
        Object.values(FriendsState)
            .filter((v) => typeof v === "number")
            .includes(newFriendsState)
    )
        account.user.friendsState = newFriendsState;
    if (
        newCommentsState &&
        Object.values(CommentHistoryState)
            .filter((v) => typeof v === "number")
            .includes(newCommentsState)
    )
        account.user.commentHistoryState = newCommentsState;

    account.user.youtube = yt ?? null;
    account.user.twitter = twitter ?? null;
    account.user.twitch = twitch ?? null;

    await account.user.save();

    return new Response("1");
}, true);
