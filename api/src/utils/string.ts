/**
 * Safely transform a regex expression into string of regex
 * @param rgx
 * @returns
 */
export function safeRegExpToString(rgx: RegExp): string {
  return rgx.source.replace(/\[gimuy]*$/, "");
}
