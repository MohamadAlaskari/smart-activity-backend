// 📁 src/ai/mcp-client.service.ts

import { Injectable } from '@nestjs/common';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

@Injectable()
export class McpClientService {
  private client: Client;

  async onModuleInit() {
    // MCP-Client initialisieren
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['mcp/google-maps.js'], // oder dein Google-Maps MCP-Tool Pfad
    });

    this.client = new Client({
      name: 'smart-activity-client',
      version: '1.0.0',
    });

    await this.client.connect(transport);
    console.log('✅ MCP Client verbunden');
  }

  async getDirections(origin: string, destination: string) {
    const args: Record<string, unknown> = {
      origin,
      destination,
      mode: 'driving',
    };

    const result = await this.client.callTool({
      name: 'maps_directions',
      arguments: args, // ⬅️ Wichtig: cast als Record<string, unknown>
    });

    return result;
  }
}
