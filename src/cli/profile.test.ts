import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "kimibot",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "kimibot", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "kimibot", "--dev", "gateway"]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "kimibot", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "kimibot", "--profile", "work", "status"]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "kimibot", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "kimibot", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (dev first)", () => {
    const res = parseCliProfileArgs(["node", "kimibot", "--dev", "--profile", "work", "status"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (profile first)", () => {
    const res = parseCliProfileArgs(["node", "kimibot", "--profile", "work", "--dev", "status"]);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join("/home/peter", ".kimibot-dev");
    expect(env.KIMIBOT_PROFILE).toBe("dev");
    expect(env.KIMIBOT_STATE_DIR).toBe(expectedStateDir);
    expect(env.KIMIBOT_CONFIG_PATH).toBe(path.join(expectedStateDir, "kimibot.json"));
    expect(env.KIMIBOT_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      KIMIBOT_STATE_DIR: "/custom",
      KIMIBOT_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.KIMIBOT_STATE_DIR).toBe("/custom");
    expect(env.KIMIBOT_GATEWAY_PORT).toBe("19099");
    expect(env.KIMIBOT_CONFIG_PATH).toBe(path.join("/custom", "kimibot.json"));
  });
});

describe("formatCliCommand", () => {
  it("returns command unchanged when no profile is set", () => {
    expect(formatCliCommand("kimibot doctor --fix", {})).toBe("kimibot doctor --fix");
  });

  it("returns command unchanged when profile is default", () => {
    expect(formatCliCommand("kimibot doctor --fix", { KIMIBOT_PROFILE: "default" })).toBe(
      "kimibot doctor --fix",
    );
  });

  it("returns command unchanged when profile is Default (case-insensitive)", () => {
    expect(formatCliCommand("kimibot doctor --fix", { KIMIBOT_PROFILE: "Default" })).toBe(
      "kimibot doctor --fix",
    );
  });

  it("returns command unchanged when profile is invalid", () => {
    expect(formatCliCommand("kimibot doctor --fix", { KIMIBOT_PROFILE: "bad profile" })).toBe(
      "kimibot doctor --fix",
    );
  });

  it("returns command unchanged when --profile is already present", () => {
    expect(
      formatCliCommand("kimibot --profile work doctor --fix", { KIMIBOT_PROFILE: "work" }),
    ).toBe("kimibot --profile work doctor --fix");
  });

  it("returns command unchanged when --dev is already present", () => {
    expect(formatCliCommand("kimibot --dev doctor", { KIMIBOT_PROFILE: "dev" })).toBe(
      "kimibot --dev doctor",
    );
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("kimibot doctor --fix", { KIMIBOT_PROFILE: "work" })).toBe(
      "kimibot --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("kimibot doctor --fix", { KIMIBOT_PROFILE: "  jbkimi  " })).toBe(
      "kimibot --profile jbkimi doctor --fix",
    );
  });

  it("handles command with no args after kimibot", () => {
    expect(formatCliCommand("kimibot", { KIMIBOT_PROFILE: "test" })).toBe(
      "kimibot --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm kimibot doctor", { KIMIBOT_PROFILE: "work" })).toBe(
      "pnpm kimibot --profile work doctor",
    );
  });
});
