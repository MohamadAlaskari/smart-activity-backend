import { Injectable, OnModuleInit } from '@nestjs/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { registerResources } from './resources';
import { registerTools } from './tools';
import { randomUUID } from 'node:crypto';

@Injectable()
export class McpService implements OnModuleInit {
  async onModuleInit() {
    const server = new McpServer({ name: 'smart-activity', version: '1.0.0' });
    registerResources(server);
    registerTools(server);

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });
    await server.connect(transport);

    console.log('✅ MCP Server läuft 🎉');
  }
}
