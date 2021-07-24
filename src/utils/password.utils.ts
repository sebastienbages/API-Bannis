import {createHash} from 'crypto';

const salt = process.env.HASH_SALT;

export function hashPassword(password: string, salt: string): string {
    return createHash("sha256").update(`${password}_${salt}`).digest("hex");
}

export function isPasswordMatch(hash: string, password: string): boolean {
    return hash === hashPassword(password, salt);
}