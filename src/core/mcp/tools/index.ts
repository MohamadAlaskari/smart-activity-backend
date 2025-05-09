import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerMapsDirectionsTool } from './maps_directions.tool';

export function registerTools(server: McpServer) {
  registerMapsDirectionsTool(server);
}
