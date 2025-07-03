import { Sequelize } from "sequelize";
import { IS_DEV } from "..";
import { exit } from "process";

if (process.env.MARIADB_PASSWORD === "my_db_password")
    console.warn(
        "YOUR MARIADB_PASSWORD IS NOT CHANGED FROM DEFAULT. PLEASE CHANGE IT!!!!"
    );
if (process.env.MARIADB_ROOT_PASSWORD === "my_db_root_password")
    console.error(
        "YOUR MARIADB_ROOT_PASSWORD IS NOT CHANGED FROM DEFAULT. PLEASE CHANGE IT!!!!"
    );

export const sql = new Sequelize({
    dialect: "mariadb",
    host: process.env.DB_HOST,
    database: process.env.MARIADB_DATABASE,
    username: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    logging: IS_DEV ? console.log : false,
    retry: {
        timeout: 5000,
        max: 10,
        backoffBase: 1000,
    },
});

try {
    await sql.authenticate();
    console.log("Connected successfully to the database!");
} catch (e) {
    console.error(`Could not connect to database: `, e);
    exit(1);
}
