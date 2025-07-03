import { User } from "../util/db";
import UserObject from "../util/decoder/user";
import { authOnly, query } from "../util/http";

export default authOnly(async (r, account) => {
    const {
        stars,
        moons,
        diamonds,
        icon,
        color1,
        color2,
        color3,
        iconType,
        coins,
        userCoins,
        special,
        accIcon,
        accShip,
        accBall,
        accBird,
        accDart,
        accRobot,
        accGlow,
        accSpider,
        accExplosion,
        accSwing,
        accJetpack,
        sinfo,
        sinfod,
        sinfog,
        demons,
    } = await query(r);

    let classicLevels =
        sinfo
            ?.split(",")
            .slice(0, 6)
            .map((n) => {
                const v = parseInt(n);
                return isNaN(v) ? 0 : v;
            }) ?? [];

    if (classicLevels.length < 6)
        classicLevels = [
            ...classicLevels,
            ...Array.from({ length: 6 - classicLevels.length }, () => 0),
        ];

    let platformerLevels =
        sinfo
            ?.split(",")
            .slice(6, 12)
            .map((n) => {
                const v = parseInt(n);
                return isNaN(v) ? 0 : v;
            }) ?? [];

    if (platformerLevels.length < 6)
        platformerLevels = [
            ...platformerLevels,
            ...Array.from({ length: 6 - platformerLevels.length }, () => 0),
        ];

    let newUser: Partial<User> = {
        stars: parseInt(stars ?? "") || 0,
        moons: parseInt(moons ?? "") || 0,
        diamonds: parseInt(diamonds ?? "") || 0,
        iconType: parseInt(iconType ?? "") || 0,
        showcaseIconId: parseInt(icon ?? "") || 0,
        color: parseInt(color1 ?? "") || 0,
        color2: parseInt(color2 ?? "") || 0,
        color3: parseInt(color3 ?? "") || 0,
        secretCoins: parseInt(coins ?? "") || 0,
        userCoins: parseInt(userCoins ?? "") || 0,
        specialId: parseInt(special ?? "") || 0,
        accIcon: parseInt(accIcon ?? "") || 0,
        accShip: parseInt(accShip ?? "") || 0,
        accBall: parseInt(accBall ?? "") || 0,
        accBird: parseInt(accBird ?? "") || 0,
        accDart: parseInt(accDart ?? "") || 0,
        accRobot: parseInt(accRobot ?? "") || 0,
        accGlow: parseInt(accGlow ?? "") || 0,
        accSpider: parseInt(accSpider ?? "") || 0,
        accExplosion: parseInt(accExplosion ?? "") || 0,
        accSwing: parseInt(accSwing ?? "") || 0,
        accJetpack: parseInt(accJetpack ?? "") || 0,
        // TODO: demon counter (level system first)
        demonLevels: [
            parseInt(demons ?? "") || 0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
        ],
        classicLevels: [
            ...classicLevels,
            parseInt(sinfod ?? "") || 0,
            parseInt(sinfog ?? "") || 0,
        ] as [number, number, number, number, number, number, number, number],
        platformerLevels: platformerLevels as [
            number,
            number,
            number,
            number,
            number,
            number
        ],
    };

    const [user, created] = await User.findOrCreate({
        where: { accountId: account.id },
        defaults: newUser,
    });

    if (!created) {
        for (const [k, v] of Object.entries(newUser)) {
            console.log(k, v);
            user.set(k, v);
        }
        user.save();
    }

    return new Response(`${user.id}`, { status: 200 });
});
