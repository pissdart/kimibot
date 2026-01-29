import { describe, expect, it } from "vitest";

import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it("detects help/version flags", () => {
    expect(hasHelpOrVersion(["node", "kimibot", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "kimibot", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "kimibot", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "kimibot", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "kimibot", "agents", "list"], 2)).toEqual(["agents", "list"]);
    expect(getCommandPath(["node", "kimibot", "status", "--", "ignored"], 2)).toEqual(["status"]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "kimibot", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "kimibot"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "kimibot", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "kimibot", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(getFlagValue(["node", "kimibot", "status", "--timeout", "5000"], "--timeout")).toBe(
      "5000",
    );
    expect(getFlagValue(["node", "kimibot", "status", "--timeout=2500"], "--timeout")).toBe("2500");
    expect(getFlagValue(["node", "kimibot", "status", "--timeout"], "--timeout")).toBeNull();
    expect(getFlagValue(["node", "kimibot", "status", "--timeout", "--json"], "--timeout")).toBe(
      null,
    );
    expect(getFlagValue(["node", "kimibot", "--", "--timeout=99"], "--timeout")).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "kimibot", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "kimibot", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "kimibot", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it("parses positive integer flag values", () => {
    expect(getPositiveIntFlagValue(["node", "kimibot", "status"], "--timeout")).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "kimibot", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(["node", "kimibot", "status", "--timeout", "5000"], "--timeout"),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(["node", "kimibot", "status", "--timeout", "nope"], "--timeout"),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["node", "kimibot", "status"],
    });
    expect(nodeArgv).toEqual(["node", "kimibot", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["node-22", "kimibot", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "kimibot", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["node-22.2.0.exe", "kimibot", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "kimibot", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["node-22.2", "kimibot", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "kimibot", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["node-22.2.exe", "kimibot", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual(["node-22.2.exe", "kimibot", "status"]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["/usr/bin/node-22.2.0", "kimibot", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "kimibot", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["nodejs", "kimibot", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "kimibot", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["node-dev", "kimibot", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual(["node", "kimibot", "node-dev", "kimibot", "status"]);

    const directArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["kimibot", "status"],
    });
    expect(directArgv).toEqual(["node", "kimibot", "status"]);

    const bunArgv = buildParseArgv({
      programName: "kimibot",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "kimibot",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "kimibot", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "kimibot", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "kimibot", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "kimibot", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "kimibot", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "kimibot", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "kimibot", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "kimibot", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});
