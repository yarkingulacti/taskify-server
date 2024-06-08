//SCOOPED FROM: https://stackoverflow.com/questions/62908969/password-hashing-in-nodejs-using-built-in-crypto

import { scryptSync, timingSafeEqual } from 'crypto';

export class PasswordTool {
  static hashPassword(password: string): string {
    return scryptSync(password, process.env.ENCRYPTION_KEY, 64).toString('hex');
  }

  static comparePassword(
    hashedPassword: string,
    suppliedPassword: string,
  ): boolean {
    // split() returns array
    // we need to pass buffer values to timingSafeEqual
    const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
    // we hash the new sign-in password
    const suppliedPasswordBuf = scryptSync(
      suppliedPassword,
      process.env.ENCRYPTION_KEY,
      64,
    );
    // compare the new supplied password with the stored hashed password
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }
}
