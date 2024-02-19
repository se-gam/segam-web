import { createCipheriv, randomBytes, scryptSync } from 'crypto';

export default function encryptPassword(password: string): string {
  const iv = randomBytes(16);
  const salt = process.env.PASSWORD_SALT;
  const secret = process.env.PASSWORD_ENCRYPT_KEY;

  if (!salt || !secret) {
    throw new Error('Missing salt or secret');
  }

  const key: Buffer = scryptSync(secret, salt, 32);

  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const encryptedPassword = `${iv.toString('hex')}:${encrypted}`;
  return encryptedPassword;
}
