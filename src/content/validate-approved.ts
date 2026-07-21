import { loadApprovedCatalog } from './catalog-loader';
import { missingCatalogAssets } from './validate-assets';

const catalog = loadApprovedCatalog();
const missingAssets = await missingCatalogAssets(catalog);
if (missingAssets.length) {
  throw new Error(`Missing approved image assets: ${missingAssets.join(', ')}`);
}

console.log(
  `Validated ${catalog.programs.length} program(s), ${catalog.audienceGroups.length} audience group(s), ${catalog.courses.length} course(s), and ${catalog.offerings.length} offering(s) from approved content.`,
);
