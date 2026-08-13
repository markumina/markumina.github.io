#!/usr/bin/env node

import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { spawn } from "node:child_process";

const sourceDir = resolve(process.argv[2] || "private/city-view-originals");
const outputDir = resolve(process.argv[3] || "city-view/assets");
const passphrase = process.env.CITY_VIEW_PASSPHRASE;
const iterations = 310_000;

const photos = [
  { source: "P1090735.JPG", id: "city-center", label: "City lights" },
  { source: "P1090739.JPG", id: "river-view", label: "Toward the river" },
  { source: "P1090741.JPG", id: "east-view", label: "Across the rooftops" },
  { source: "P1090744.JPG", id: "night-view", label: "Windows at night" },
];

if (!passphrase) {
  console.error("Set CITY_VIEW_PASSPHRASE before running this script.");
  process.exit(1);
}

function run(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

function encrypt(data) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = pbkdf2Sync(passphrase, salt, iterations, 32, "sha256");
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(data), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([Buffer.from("CV01"), salt, iv, tag, ciphertext]);
}

await mkdir(outputDir, { recursive: true });
const manifest = { version: 1, iterations, photos: [] };

for (const photo of photos) {
  const sourcePath = join(sourceDir, photo.source);
  const previewPath = join(outputDir, `${photo.id}.preview.jpg`);
  const original = await readFile(sourcePath);

  await run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    sourcePath,
    "-vf",
    "scale=720:-2",
    "-q:v",
    "5",
    previewPath,
  ]);

  const preview = await readFile(previewPath);
  const encryptedPreview = encrypt(preview);
  const encryptedFull = encrypt(original);
  const previewFile = `${photo.id}.preview.enc`;
  const fullFile = `${photo.id}.full.enc`;

  await Promise.all([
    writeFile(join(outputDir, previewFile), encryptedPreview),
    writeFile(join(outputDir, fullFile), encryptedFull),
  ]);
  await unlink(previewPath);

  manifest.photos.push({
    id: photo.id,
    label: photo.label,
    preview: `assets/${previewFile}`,
    full: `assets/${fullFile}`,
    bytes: original.byteLength,
  });

  console.log(`Encrypted ${basename(sourcePath)} without changing the source file.`);
}

await writeFile(
  join(outputDir, "manifest.js"),
  `window.CITY_VIEW_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`,
);

console.log(`Wrote ${manifest.photos.length} encrypted photos to ${outputDir}.`);
