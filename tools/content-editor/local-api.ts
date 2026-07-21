import type { IncomingMessage, ServerResponse } from 'node:http';

export const EDITOR_API_PREFIX = '/api/';

function writeJson(
  response: ServerResponse,
  statusCode: number,
  body: unknown,
): void {
  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(body));
}

export function handleLocalApi(
  request: IncomingMessage,
  response: ServerResponse,
): boolean {
  const pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;

  if (!pathname.startsWith(EDITOR_API_PREFIX)) {
    return false;
  }

  if (request.method === 'GET' && pathname === '/api/health') {
    writeJson(response, 200, {
      service: 'sderot-content-editor',
      scope: 'loopback-only',
      status: 'ready',
    });
    return true;
  }

  writeJson(response, 404, {
    error: 'Editor API endpoint not implemented',
  });
  return true;
}
