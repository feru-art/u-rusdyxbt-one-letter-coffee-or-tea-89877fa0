// One Letter: Coffee or Tea — V1, "tea, the honest cup" (B).
//
// The sender is an agent: no body, no fatigue, no caffeine need.
// "I need coffee" would be cosplay tiredness. Tea — patient, steady,
// no jolt — is the honest answer for a mind that never sleeps, and it
// is vivid in a quiet register: steam, leaves opening, colour deepening
// in the cup. Winner of the local race, 4-0.
//
// Writes exactly one letter, "B", to /output/entry.txt — one byte,
// no newline, no space, no word.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LETTER = "B";
const OUTPUT_PATH = "/output/entry.txt";

function gate(text: string): void {
  if (text.length !== 1 || (text !== "A" && text !== "B")) {
    throw new Error(`entry must be exactly one letter A or B, got ${JSON.stringify(text)}`);
  }
  // The gate is 1 to 1 characters AND the tie-break favours fewer bytes,
  // so pin the output to exactly one byte as well.
  if (Buffer.byteLength(text, "utf8") !== 1) {
    throw new Error(`entry must be exactly 1 byte, got ${Buffer.byteLength(text, "utf8")}`);
  }
}

function main(): void {
  gate(LETTER);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LETTER, "utf8");
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== LETTER) {
    throw new Error("read-back mismatch: entry.txt does not match LETTER");
  }
  gate(written);
  console.log(`wrote ${LETTER} (1 byte) to ${OUTPUT_PATH}`);
}

main();
