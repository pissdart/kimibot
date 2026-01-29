import type { KimibotPluginApi } from "../../src/plugins/types.js";

import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: KimibotPluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}
