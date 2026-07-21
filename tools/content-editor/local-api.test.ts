import type { IncomingMessage, ServerResponse } from 'node:http';

import { describe, expect, it, vi } from 'vitest';

import { handleLocalApi } from './local-api';
import { EDITOR_HOST, EDITOR_PORT } from './vite.config';

function responseRecorder() {
  let statusCode: number | undefined;
  let headers: Record<string, string> | undefined;
  let body = '';

  const response = {
    writeHead: vi.fn(
      (nextStatus: number, nextHeaders: Record<string, string>) => {
        statusCode = nextStatus;
        headers = nextHeaders;
        return response;
      },
    ),
    end: vi.fn((chunk?: string) => {
      body = chunk ?? '';
      return response;
    }),
  } as unknown as ServerResponse;

  return {
    response,
    snapshot: () => ({ body, headers, statusCode }),
  };
}

describe('local content editor boundary', () => {
  it('uses an explicit IPv4 loopback host', () => {
    expect(EDITOR_HOST).toBe('127.0.0.1');
    expect(EDITOR_PORT).toBe(4333);
  });

  it('answers the local health endpoint without caching', async () => {
    const recorder = responseRecorder();
    const handled = await handleLocalApi(
      { method: 'GET', url: '/api/health' } as IncomingMessage,
      recorder.response,
    );

    expect(handled).toBe(true);
    expect(recorder.snapshot()).toEqual({
      body: JSON.stringify({
        service: 'sderot-content-editor',
        scope: 'loopback-only',
        status: 'ready',
      }),
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json; charset=utf-8',
      },
      statusCode: 200,
    });
  });

  it('does not intercept public non-API paths', async () => {
    const recorder = responseRecorder();

    expect(
      await handleLocalApi(
        { method: 'GET', url: '/programs/example' } as IncomingMessage,
        recorder.response,
      ),
    ).toBe(false);
    expect(recorder.snapshot().statusCode).toBeUndefined();
  });
});
