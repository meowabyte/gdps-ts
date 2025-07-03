import { join } from "path";

export const ROOT_PATH = join(import.meta.dir, "../..");
export const SRC_PATH = join(ROOT_PATH, "src");

export const IS_DEV = typeof process.env.DEV === "string";

export const randNum = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
