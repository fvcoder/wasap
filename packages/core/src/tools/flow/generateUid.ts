import { createHash } from "crypto";

/**
 * Genera un hash apartir de las llaves de entrada
 * @param {string} keys - llaves/keys
 * @returns {string} hash
 */
export function generateUid(keys: string[]): string {
	return createHash("md5").update(JSON.stringify(keys)).digest("hex");
}
