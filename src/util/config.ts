import type { Tuple } from "../types";

type ConfigType = {
    /**
     * ### Admin User Settings
     *
     * Admin user is a default user created on first GDPS launch.
     * It will serve as starting point for any moderation actions.
     * Please if you can, create new admin account manually and grant them mod level using this account instead.
     *
     * **WARNING:** Account credentials must match the GDPS registering requirements
     */
    admin: {
        username: string;
        password: string;
    };
    /**
     * ### Daily Chest Settings
     *
     * You can configure drop rates, shard drop chance and delay between chests here.
     * **Setting drop rates too high will break this feature! (client limitation)**
     */
    dailyChest: {
        /** Drop Settings */
        drop: {
            /**
             * Small chest drop count
             * (`[MIN, MAX]`)
             * @example ```ts
             * { orb: [100, 200], diamond: [3, 6] }
             * ```
             */
            small: {
                orb: Tuple<number>;
                diamond: Tuple<number>;
            };
            /**
             * Large chest drop count
             * (`[MIN, MAX]`)
             * @example ```ts
             * { orb: [100, 200], diamond: [3, 6] }
             * ```
             */
            large: {
                orb: Tuple<number>;
                diamond: Tuple<number>;
            };
            /**
             * Chances (in %) for shard to drop
             * (applies to both slots so choose carefully)
             */
            shardChance: number;
        };
        /** Delay (in seconds) between small chests */
        smallChestDelay: number;
        /** Delay (in seconds) between large chests */
        largeChestDelay: number;
    };
};

/**
 * Define GDPS config with proper typing inherited
 * @param cfg Config object
 */
const defineConfig = (cfg: ConfigType) => cfg;
export default defineConfig;

export { default as config } from "../../gdps.config.ts";
