#!/usr/bin/env node

import { createDecipheriv, createHash, pbkdf2Sync } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const sourceDir = resolve(process.argv[2] || "private/city-view-originals");
const assetDir = resolve(process.argv[3] || "city-view/assets");
const passphrase = process.env.CITY_VIEW_PASSPHRASE;
const iterations = 310_000;
const photos = [
  ["P1090735.JPG", "city-center.full.enc"],
  ["P1090739.JPG", "river-view.full.enc"],
  ["P1090741.JPG", "east-view.full.enc"],
  ["P1090744.JPG", "night-view.full.enc"],
];

if (!passphrase) {
  console.error("Set CITY_VIEW_PASSPHRASE before running this script.");
  process.exit(1);
}

function hash(data) {
  return createHash("sha256").update(data).digest("hex");
}

function decrypt(data) {
  if (data.subarray(0, 4).toString() !== "CV01") throw new Error("Unknown encrypted file format");
  const salt = data.subarray(4, 20);
  const iv = data.subarray(20, 32);
  const tag = data.subarray(32, 48);
  const ciphertext = data.subarray(48);
  const key = pbkdf2Sync(passphrase, salt, iterations, 32, "sha256");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

for (const [sourceName, assetName] of photos) {
  const [source, encrypted] = await Promise.all([
    readFile(join(sourceDir, sourceName)),
    readFile(join(assetDir, assetName)),
  ]);
  const decrypted = decrypt(encrypted);
  if (hash(source) !== hash(decrypted)) {
    throw new Error(`${assetName} does not restore the exact bytes of ${sourceName}`);
  }
  console.log(`Verified exact byte match: ${sourceName}`);
}
