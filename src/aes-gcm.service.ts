import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AesGcmService {
  constructor(@Inject('AES_SECRET_KEY') private key: string) {
  }

  /**
   * Generate random base64 string from bytes 32
   * @param {number} size;
   * @return {string}
   */
  generateRandomKey(size: number = 32): string {
    return crypto.randomBytes(32).toString('base64');
  }

  /**
   * Encrypt an data string to aes-256-gcm
   * @param {string} data
   * @param {string} [secretKey]
   * @return {string}
   */
  encrypt(data: string, secretKey: string = this.key): string {
    const iv = crypto.randomBytes(16);
    const salt = crypto.randomBytes(64);
    const key = crypto.pbkdf2Sync(secretKey, salt, 2145, 32, 'sha512');
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
  }

  /**
   * Decrypt an encrypted by aes-256-gcm.
   * @param {string} encrypted
   * @param {string} [secretKey]
   * @return {string | null}
   */
  decrypt(encrypted: string, secretKey: string = this.key): string {
    const bData = Buffer.from(encrypted, 'base64');
    const salt = bData.slice(0, 64);
    const iv = bData.slice(64, 80);
    const tag = bData.slice(80, 96);
    const text = bData.slice(96);
    const key = crypto.pbkdf2Sync(secretKey, salt, 2145, 32, 'sha512');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
  }

  /**
   * Encryption md5 method an string
   * @param {string} data
   * @return {string}
   */
  md5(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex');
  }
}
