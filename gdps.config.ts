import defineConfig from "./src/util/config";

export default defineConfig({
    dailyChest: {
        drop: {
            small: {
                orb: [50, 80],
                diamond: [2, 5],
            },
            large: {
                orb: [100, 200],
                diamond: [5, 8],
            },
            shardChance: 20,
        },
        smallChestDelay: 1800, // 30 minutes
        largeChestDelay: 3600, // 1 hour
    },
    admin: {
        username: "admin",
        password: "admin12345",
    },
});
