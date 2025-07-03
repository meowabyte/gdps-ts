import { writeFile, exists } from "fs/promises";
import { join } from "path";
import { ROOT_PATH } from ".";
import { existsSync, mkdirSync } from "fs";
import { readFile } from "fs/promises";

const BACKUPS_PATH = join(ROOT_PATH, "save");
if (!existsSync(BACKUPS_PATH)) mkdirSync(BACKUPS_PATH, { recursive: true });

export const save = async ({
    id,
    saveData,
    gameVersion,
    binaryVersion,
}: {
    id: number;
    gameVersion: number;
    binaryVersion: number;
    saveData: string;
}) => {
    try {
        await writeFile(
            join(BACKUPS_PATH, `${id}`),
            [saveData, gameVersion, binaryVersion].join(";")
        );
    } catch (e) {
        console.error(`There was an error saving backup ID ${id}: `, e);
        return false;
    }
    return true;
};

export const load = async ({ id }: { id: number }) => {
    const backupPath = join(BACKUPS_PATH, `${id}`);
    if (!(await exists(backupPath))) return null;

    try {
        return await readFile(backupPath, "utf-8");
    } catch (e) {
        console.error(`There was an error loading backup ID ${id}: `, e);
        return null;
    }
};
