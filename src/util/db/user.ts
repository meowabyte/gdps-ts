import { BelongsTo, DataTypes, Model } from "sequelize";
import {
    CommentHistoryState,
    FriendsState,
    MessageState,
    ModLevel,
} from "../decoder/user";
import { sql } from "./sql";
import handleRegister from "../handleRegister";
import { config } from "../config";

export class Account extends Model {
    declare id: number;
    declare username: string;
    declare gjp2: string;
    declare discordToken: string | null;
    declare banned: boolean | null;
    declare modLevel: ModLevel | null;

    declare user: User;
}

export class User extends Model {
    declare id: number;
    declare accountId: number;
    declare rank: number;
    declare stars: number;
    declare moons: number;
    declare diamonds: number;
    declare creatorPoints: number;
    declare iconType: number;
    /** ID of an icon on showcase */
    declare showcaseIconId: number;
    declare specialId: number;
    declare accIcon: number;
    declare accShip: number;
    declare accBall: number;
    declare accBird: number;
    declare accDart: number;
    declare accRobot: number;
    declare accGlow: number;
    declare accSpider: number;
    declare accExplosion: number;
    declare accSwing: number;
    declare accJetpack: number;
    /** primary color */
    declare color: number;
    /** secondary color */
    declare color2: number;
    /** glow color */
    declare color3: number;
    declare secretCoins: number;
    declare userCoins: number;
    declare messageState: MessageState;
    declare friendsState: FriendsState;
    declare commentHistoryState: CommentHistoryState;
    declare youtube: string | null;
    declare twitter: string | null;
    declare twitch: string | null;
    /** `{easy},{medium},{hard}.{insane},{extreme},{easyPlatformer},{mediumPlatformer},{hardPlatformer},{insanePlatformer},{extremePlatformer},{weekly},{gauntlet}` */
    declare demonLevels: [
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
    /** `{auto},{easy},{normal},{hard},{harder},{insane},{daily},{gauntlet}` */
    declare classicLevels: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    /** `{auto},{easy},{normal},{hard},{harder},{insane}` */
    declare platformerLevels: [number, number, number, number, number, number];

    /** (timestamp in seconds) */
    declare lastSmallChest: number;
    declare smallChestCount: number;
    /** (timestamp in seconds) */
    declare lastLargeChest: number;
    declare largeChestCount: number;
}

Account.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                min: 3,
                max: 20,
            },
        },
        gjp2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discordToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        banned: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        modLevel: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
        },
    },
    { sequelize: sql, modelName: "account" }
);

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        rank: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
        stars: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        moons: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        diamonds: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        creatorPoints: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        iconType: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        showcaseIconId: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        specialId: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accIcon: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accShip: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accBall: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accBird: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accDart: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accRobot: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accGlow: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accSpider: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accExplosion: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accSwing: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        accJetpack: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        color: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        color2: {
            type: DataTypes.SMALLINT.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        color3: {
            type: DataTypes.SMALLINT,
            defaultValue: -1,
            allowNull: false,
        },
        secretCoins: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        userCoins: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
        },
        messageState: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: MessageState.FRIENDS_ONLY,
        },
        friendsState: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: FriendsState.NONE,
        },
        commentHistoryState: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: CommentHistoryState.FRIENDS_ONLY,
        },
        youtube: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        twitter: { type: DataTypes.STRING, allowNull: true },
        twitch: { type: DataTypes.STRING, allowNull: true },
        demonLevels: {
            type: DataTypes.TEXT,
            defaultValue: Array.from({ length: 12 }, () => 0).join(","),
            set(val) {
                if (!Array.isArray(val))
                    throw new Error("Value is not an array");
                this.setDataValue("demonLevels", val.join(","));
            },
            get() {
                return this.getDataValue("demonLevels")
                    .split(",")
                    .map((v: string) => parseInt(v) || 0);
            },
        },
        classicLevels: {
            type: DataTypes.TEXT,
            defaultValue: Array.from({ length: 8 }, () => 0).join(","),
            set(val) {
                if (!Array.isArray(val))
                    throw new Error("Value is not an array");
                this.setDataValue("classicLevels", val.join(","));
            },
            get() {
                return this.getDataValue("classicLevels")
                    .split(",")
                    .map((v: string) => parseInt(v) || 0);
            },
        },
        platformerLevels: {
            type: DataTypes.TEXT,
            defaultValue: Array.from({ length: 6 }, () => 0).join(","),
            set(val) {
                if (!Array.isArray(val))
                    throw new Error("Value is not an array");
                this.setDataValue("platformerLevels", val.join(","));
            },
            get() {
                return this.getDataValue("platformerLevels")
                    .split(",")
                    .map((v: string) => parseInt(v) || 0);
            },
        },
        lastSmallChest: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        smallChestCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        lastLargeChest: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        largeChestCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { sequelize: sql, modelName: "user", createdAt: false }
);

Account.hasOne(User, {
    foreignKey: "accountId",
    as: "user",
    onDelete: "CASCADE",
});
User.belongsTo(Account, {
    foreignKey: "accountId",
    as: "account",
});

const createAdmin = async () => {
    const adminCount = await Account.count({
        where: { username: config.admin.username },
    });
    if (adminCount > 0) return;

    const res = await handleRegister({
        username: config.admin.username,
        password: config.admin.password,
        email: "admin@e.mail",
    });
    if (!res.ok) {
        console.warn("Could not create admin account! ERROR: ", res.code);
        return;
    }

    const { account: acc } = res;
    acc.modLevel = ModLevel.ELDER;
    acc.save();

    console.log(`Created admin account (${config.admin.username})`);
};

try {
    createAdmin();
} catch (e) {
    console.error("There was an error creating admin account! ", e);
}
