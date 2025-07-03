export enum Salts {
    GJP2 = "mI29fmAnxgTs",
}

export default class GJP2 {
    static check(str: string, hash: string, salt: Salts = Salts.GJP2) {
        return this.encode(str, salt) === hash;
    }

    static encode(str: string, salt: Salts = Salts.GJP2) {
        const v = str + salt;
        return new Bun.SHA1().update(v).digest("hex");
    }
}
