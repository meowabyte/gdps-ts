import { User } from "../db";

export enum MessageState {
    ALL = 0,
    FRIENDS_ONLY = 1,
    NONE = 2,
}

export enum FriendsState {
    ALL = 0,
    NONE = 1,
}

export enum FriendState {
    NONE = 0,
    ALREADY_FRIEND = 1,
    USER_SENT = 3,
    TARGET_SENT = 4,
}

export enum ModLevel {
    NONE = 0,
    NORMAL = 1,
    ELDER = 2,
}

export enum CommentHistoryState {
    ALL = 0,
    FRIENDS_ONLY = 1,
    NONE = 2,
}

const userKeys: Map<keyof UserType, number> = new Map([
    ["username", 1],
    ["userId", 2],
    ["stars", 3],
    ["demons", 4],
    ["ranking", 6],
    ["accountHighlight", 7],
    ["creatorPoints", 8],
    ["iconId", 9],
    ["color", 10],
    ["color2", 11],
    ["secretCoins", 13],
    ["iconType", 14],
    ["special", 15],
    ["accountId", 16],
    ["userCoins", 17],
    ["messageState", 18],
    ["friendsState", 19],
    ["youtube", 20],
    ["accIcon", 21],
    ["accShip", 22],
    ["accBall", 23],
    ["accBird", 24],
    ["accDart", 25],
    ["accRobot", 26],
    ["accStreak", 27],
    ["accGlow", 28],
    ["isRegistered", 29],
    ["globalRank", 30],
    ["friendState", 31],
    ["messages", 38],
    ["friendRequests", 39],
    ["newFriends", 40],
    ["newFriendRequest", 41],
    ["age", 42],
    ["accSpider", 43],
    ["twitter", 44],
    ["twitch", 45],
    ["diamonds", 46],
    ["accExplosion", 48],
    ["modLevel", 49],
    ["commentHistoryState", 50],
    ["color3", 51],
    ["moons", 52],
    ["accSwing", 53],
    ["accJetpack", 54],
    ["demonLevels", 55],
    ["classicLevels", 56],
    ["platformerLevels", 57],
]);

export type UserType = {
    username: string;
    userId: number;
    stars: number;
    demons: number;
    ranking: number;
    accountHighlight: number;
    creatorPoints: number;
    iconId: number;
    color: number;
    color2: number;
    secretCoins: number;
    iconType: number;
    special: number;
    accountId: number;
    userCoins: number;
    messageState: MessageState;
    friendsState: FriendsState;
    youtube: string;
    accIcon: number;
    accShip: number;
    accBall: number;
    accBird: number;
    accDart: number;
    accRobot: number;
    accStreak: number;
    accGlow: number;
    isRegistered: boolean;
    globalRank: number;
    friendState: FriendState;
    messages: number;
    friendRequests: number;
    newFriends: number;
    newFriendRequest: boolean;
    age: string;
    accSpider: number;
    twitter: string;
    twitch: string;
    diamonds: number;
    accExplosion: number;
    modLevel: ModLevel;
    commentHistoryState: CommentHistoryState;
    color3: number;
    moons: number;
    accSwing: number;
    accJetpack: number;
    /** @see https://wyliemaster.github.io/gddocs/#/resources/server/user */
    demonLevels: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    /** @see https://wyliemaster.github.io/gddocs/#/resources/server/user */
    classicLevels: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    /** @see https://wyliemaster.github.io/gddocs/#/resources/server/user */
    platformerLevels: [number, number, number, number, number, number];
};

export default class UserObject {
    static encode(o: Partial<UserType>) {
        return Object.entries(o)
            .reduce((arr, [k, v]) => {
                if (typeof v === "boolean") v = Number(v);
                arr.push(userKeys.get(k as keyof UserType)!, v);
                return arr;
            }, [] as any[])
            .join(":");
    }
    static decode(d: string): Partial<UserType> {
        return d.matchAll(/(\d+):([^:]+)/g).reduce((o, [, k, v]) => {
            const kN = parseInt(k!);
            if (isNaN(kN)) return o;

            const keyName = userKeys.entries().find(([, v]) => v === kN)?.[0];
            if (!keyName) return o;

            return {
                ...o,
                [keyName]: v,
            };
        }, {});
    }
}
