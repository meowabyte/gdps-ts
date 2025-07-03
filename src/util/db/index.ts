import { sql } from "./sql";

export { User, Account } from "./user";
export { default as ProfileComments } from "./profileComments";

await sql.sync();
export default sql;
