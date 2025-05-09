// 📁 src/core/mcp/tools/maps_directions.tool.ts

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import fetch from 'node-fetch';

interface GoogleDirectionsResponse {
  status: string;
  error_message?: string;
  routes: Array<{
    summary: string;
    legs: Array<{
      duration: { text: string; value: number };
      distance: { text: string; value: number };
    }>;
  }>;
}

export function registerMapsDirectionsTool(server: McpServer) {
  server.tool(
    'maps_directions',
    {
      origin: z.string(),
      destination: z.string(),
      mode: z.enum(['driving', 'walking', 'bicycling', 'transit']).optional(),
    },
    async ({ origin, destination, mode = 'driving' }) => {
      const apiKey = 'AIzaSyD3QmLQn7EoXvb2W4DX_iO7fVn32xlyDM4';
      if (!apiKey) {
        return {
          content: [
            {
              type: 'text',
              text: '❌ Missing GOOGLE_MAPS_API_KEY in environment variables.',
            },
          ],
          isError: true,
        };
      }

      const url = new URL(
        'https://maps.googleapis.com/maps/api/directions/json',
      );
      url.searchParams.set('origin', origin);
      url.searchParams.set('destination', destination);
      url.searchParams.set('mode', mode);
      url.searchParams.set('key', apiKey);

      const res = await fetch(url.toString());
      const data = (await res.json()) as GoogleDirectionsResponse;

      if (data.status !== 'OK') {
        return {
          content: [
            {
              type: 'text',
              text: `❌ Directions API Error: ${data.error_message || data.status}`,
            },
          ],
          isError: true,
        };
      }

      const route = data.routes[0];
      const leg = route.legs[0];

      return {
        content: [
          {
            type: 'text',
            text: `🚗 Route from ${origin} to ${destination}:
- Duration: ${leg.duration.text}
- Distance: ${leg.distance.text}
- Summary: ${route.summary}`,
          },
        ],
      };
    },
  );
}
