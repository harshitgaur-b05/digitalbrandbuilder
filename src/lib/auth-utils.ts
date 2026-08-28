import crypto from 'crypto';

const SECRET = process.env.SESSION_SECRET || 'default_secret_please_change_in_env_file_to_something_secure';
const KEY = crypto.createHash('sha256').update(SECRET).digest();

/**
 * Hashes a password using scryptSync and a unique salt.
 * Returns the hash in salt:hash format.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a password against a stored salt:hash string.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    const verifyHash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'));
  } catch (error) {
    return false;
  }
}

/**
 * Encrypts a session payload into an AES-256-GCM token.
 */
export function encryptSession(payload: any): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${encrypted.toString('hex')}:${tag.toString('hex')}`;
}

/**
 * Decrypts an AES-256-GCM token back into the session payload.
 * Returns null if decryption or parsing fails.
 */
export function decryptSession(token: string): any | null {
  try {
    const [ivHex, encryptedHex, tagHex] = token.split(':');
    if (!ivHex || !encryptedHex || !tagHex) return null;
    
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
    decipher.setAuthTag(tag);
    
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return JSON.parse(decrypted.toString('utf8'));
  } catch (error) {
    return null;
  }
}
