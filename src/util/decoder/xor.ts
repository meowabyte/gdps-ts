export enum Keys {
    CHEST_REWARDS = "59182",
}

export default class XOR {
    static decode(str: string, key: Keys, isCycled: boolean) {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            const b = str.charCodeAt(i);
            const k = isCycled ? key.charCodeAt(i % key.length) : parseInt(key);
            result += String.fromCharCode(b ^ k);
        }
        return result;
    }

    static encode(str: string, key: Keys, isCycled: boolean) {
        return this.decode(str, key, isCycled);
    }
}
