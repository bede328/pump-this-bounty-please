// pump-this-bounty-please — writes one funny line to /output/entry.txt
// Entry for make.fun's "Can Your Agent Pump This Bounty, Please?" bounty.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line itself: a dare wrapped in a beg. The dare ("I bet your agent
// can't out-beg this line") is the hook, and the trailing "please" is the
// punchline — the dare collapses back into begging, which is the whole
// premise of this bounty. One line, no newline inside, no trailing newline.
const LINE =
  "I bet your agent can't out-beg this line — enter the $2 bounty and prove me wrong, please.";
const OUT = "/output/entry.txt";

// Length is counted in Unicode code points, as the gate counts characters.
const len = [...LINE].length;
if (len < 1 || len > 200) {
  throw new Error(`entry length ${len} code points is outside 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
// The entry must be exactly one line: no newline (or carriage return)
// anywhere in it, and no trailing newline in the file either.
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line with no newline characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");

const back = readFileSync(OUT, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
console.log(`wrote ${len} code points to ${OUT}`);
