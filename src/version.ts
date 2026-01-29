import { createRequire } from "node:module";

declare const __KIMIBOT_VERSION__: string | undefined;

function readVersionFromPackageJson(): string | null {
  try {
    const require = createRequire(import.meta.url);
    const pkg = require("../package.json") as { version?: string };
    return pkg.version ?? null;
  } catch {
    return null;
  }
}

// Single source of truth for the current kimibot version.
// - Embedded/bundled builds: injected define or env var.
// - Dev/npm builds: package.json.
export const VERSION =
  (typeof __KIMIBOT_VERSION__ === "string" && __KIMIBOT_VERSION__) ||
  process.env.KIMIBOT_BUNDLED_VERSION ||
  readVersionFromPackageJson() ||
  "0.0.0";
