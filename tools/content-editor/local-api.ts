import type { IncomingMessage, ServerResponse } from 'node:http';

import {
  exportApproved,
  loadCatalog,
  saveDraft,
  validateEditorCatalog,
} from './catalog-files';
import { saveImageUpload, type ImageUpload } from './image-files';

export const EDITOR_API_PREFIX = '/api/';
const MAX_BODY_BYTES = 5 * 1024 * 1024;

interface CatalogRequest {
  acknowledgeWarnings?: boolean;
  catalog?: unknown;
  warnings?: string[];
}

type EditorRequest = CatalogRequest & Partial<ImageUpload>;

function writeJson(response: ServerResponse, status: number, body: unknown) {
  response.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(body));
}

async function readJson(request: IncomingMessage): Promise<EditorRequest> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) throw new Error('Request body is too large');
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as CatalogRequest;
}

export async function handleLocalApi(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<boolean> {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  if (!url.pathname.startsWith(EDITOR_API_PREFIX)) return false;

  try {
    if (request.method === 'GET' && url.pathname === '/api/health') {
      writeJson(response, 200, {
        service: 'sderot-content-editor',
        scope: 'loopback-only',
        status: 'ready',
      });
      return true;
    }

    if (request.method === 'GET' && url.pathname === '/api/catalog') {
      const source =
        url.searchParams.get('source') === 'draft' ? 'draft' : 'approved';
      writeJson(response, 200, { catalog: await loadCatalog(source), source });
      return true;
    }

    if (request.method === 'POST' && url.pathname === '/api/validate') {
      const body = await readJson(request);
      writeJson(
        response,
        200,
        validateEditorCatalog(body.catalog, body.warnings),
      );
      return true;
    }

    if (request.method === 'POST' && url.pathname === '/api/images') {
      const body = await readJson(request);
      if (!body.dataBase64 || !body.entityId || !body.kind || !body.mimeType)
        throw new Error('Missing image upload fields');
      writeJson(response, 201, await saveImageUpload(body as ImageUpload));
      return true;
    }

    if (request.method === 'PUT' && url.pathname === '/api/catalog/draft') {
      const body = await readJson(request);
      await saveDraft(body.catalog);
      writeJson(response, 200, { saved: true });
      return true;
    }

    if (request.method === 'POST' && url.pathname === '/api/catalog/export') {
      const body = await readJson(request);
      const result = await exportApproved(
        body.catalog,
        body.warnings ?? [],
        body.acknowledgeWarnings === true,
      );
      const blockedByWarnings =
        result.warnings.length > 0 && body.acknowledgeWarnings !== true;
      writeJson(response, result.valid && !blockedByWarnings ? 200 : 422, {
        ...result,
        exported: result.valid && !blockedByWarnings,
        warningsRequireAcknowledgement: blockedByWarnings,
      });
      return true;
    }
  } catch (error) {
    writeJson(response, 400, {
      error: error instanceof Error ? error.message : 'Invalid request',
    });
    return true;
  }

  writeJson(response, 404, { error: 'Editor API endpoint not implemented' });
  return true;
}
