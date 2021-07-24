import { hashPassword } from '../utils/password.utils';
import { User } from './user.entity';
import * as assert from "assert";

describe("User", () => {
    it("should hash password", () => {
        const user = new User();
        user.password = "toto";
        const expected = hashPassword("toto", process.env.HASH_SALT);
        assert.strictEqual(user.hashedPassword, expected);
    });
});