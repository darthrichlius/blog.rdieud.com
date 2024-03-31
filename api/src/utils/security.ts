import * as jwt from "jsonwebtoken";
import { createHash } from "crypto";

/**
 * Encrypts a string using an lgorithm, for enhanced security
 *
 * @param text The string to be encrpted
 * @param algorithm The algorithm to be used (Default 'sha256')
 * @returns The encrypted string in hexadecimal format
 */
export function encryptMe(text: string, algorithm: string = "sha256"): string {
  // Create SHA-256 hash object used to hash the password
  const hash = createHash(algorithm);
  // Update the hash object with the string to be encrypted
  hash.update(text);
  // The encrypted value in hexadecimal format
  return hash.digest("hex");
}

/**
 * Generate a token based on payload and options
 * @param payload
 * @param secret
 * @param expiresIn
 * @returns
 */
export function generateAccessToken(
  payload: Record<string, any>,
  secret: string,
  expiresIn: number
): string {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
}
