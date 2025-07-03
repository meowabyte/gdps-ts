# CONFIG.md

Configuration is being used as Typescript module that can be found in [gdps.config.ts](/gdps.config.ts). I'm using it instead of traditional JSON to allow strict typing (which would be problematic with standard JSON)

| key                           | description                                                                                                                                           | default                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `dailyChest`                  | Daily chest drop rates, shard drop chance and delay between chests                                                                                    | -                         |
| `dailyChest.drop`             | Minimum and maximum rate that will drop off chest. `[MIN, MAX]` Take a note that putting values too high might break the feature! (Client limitation) | -                         |
| `dailyChest.drop.small`       | Small chest drop rates                                                                                                                                | 50-80 orbs 2-5 diamonds   |
| `dailyChest.drop.large`       | Large chest drop rates                                                                                                                                | 100-200 orbs 5-8 diamonds |
| `dailyChest.drop.shardChance` | Chance (in %) how often will shards drop off both chests. (applies to both item slots in chest)                                                       | `20%`                     |
| `dailyChest.smallChestDelay`  | Delay (in seconds) between small chest being available                                                                                                | `1800s` (30 minutes)      |
| `dailyChest.largeChestDelay`  | Delay (in seconds) between large chest being available                                                                                                | `3600s` (1 hour)          |
| `admin`                       | Login details for admin account. [More about admin account](#admin-account)                                                                           | -                         |
| `admin.username`              | Admin username                                                                                                                                        | `admin`                   |
| `admin.password`              | Admin password                                                                                                                                        | `admin12345`              |

## Admin Account

> [!CAUTION]  
> **Please before publishing GDPS, change login credentials to the admin account as the default admin password is being known publically and will open possibility to hack into your GDPS!**

When you first run GDPS on newly created server you will most likely not have any user there. **Not even an admin user.** So to prevent that and to prevent you from connecting into GDPS database just to set your account as moderator, server creates default account that has the highest moderator privileges possible. It has access to every single command and every single moderator action possible.
