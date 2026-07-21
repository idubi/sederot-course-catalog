import approvedCatalogJson from '../../content/approved/catalog.json';
import type { Catalog } from '../domain';
import { catalogSchema } from './schema';

export const APPROVED_CATALOG_PATH = 'content/approved/catalog.json' as const;

export function loadApprovedCatalog(): Catalog {
  return catalogSchema.parse(approvedCatalogJson);
}
