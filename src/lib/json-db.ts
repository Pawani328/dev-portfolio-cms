import fs from "fs";
import path from "path";

/**
 * Get the path to a JSON data file.
 * In production (Vercel), we read from the bundled data directory.
 */
function getDataPath(fileName: string): string {
  return path.join(process.cwd(), "data", fileName);
}

/**
 * Read and parse a JSON file from the /data directory.
 */
export function readJson<T = unknown>(fileName: string): T {
  const filePath = getDataPath(fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

/**
 * Write data to a JSON file in the /data directory.
 * Creates the file if it doesn't exist.
 */
export function writeJson<T = unknown>(fileName: string, data: T): void {
  const filePath = getDataPath(fileName);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
