import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveGatewayStateDir } from "./paths.js";

describe("resolveGatewayStateDir", () => {
  it("uses the default state dir when no overrides are set", () => {
    const env = { HOME: "/Users/test" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".kimibot"));
  });

  it("appends the profile suffix when set", () => {
    const env = { HOME: "/Users/test", KIMIBOT_PROFILE: "rescue" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".kimibot-rescue"));
  });

  it("treats default profiles as the base state dir", () => {
    const env = { HOME: "/Users/test", KIMIBOT_PROFILE: "Default" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".kimibot"));
  });

  it("uses KIMIBOT_STATE_DIR when provided", () => {
    const env = { HOME: "/Users/test", KIMIBOT_STATE_DIR: "/var/lib/kimibot" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/var/lib/kimibot"));
  });

  it("expands ~ in KIMIBOT_STATE_DIR", () => {
    const env = { HOME: "/Users/test", KIMIBOT_STATE_DIR: "~/kimibot-state" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/Users/test/kimibot-state"));
  });

  it("preserves Windows absolute paths without HOME", () => {
    const env = { KIMIBOT_STATE_DIR: "C:\\State\\kimibot" };
    expect(resolveGatewayStateDir(env)).toBe("C:\\State\\kimibot");
  });
});
