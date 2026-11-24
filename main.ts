import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Every morning the same sparrow lands on the same wire and the wire, for one second, forgets it is supposed to sag.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes !== chars) {
  throw new Error(`line must be pure ASCII so bytes equal chars, got ${bytes} bytes for ${chars} chars`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

const readBack = readFileSync(`${outDir}/entry.txt`, "utf8");
if (readBack !== LINE) {
  throw new Error("read-back of entry.txt does not match the line byte for byte");
}
