import { loadApprovedCatalog } from './catalog-loader';

const catalog = loadApprovedCatalog();

console.log(
  `Validated ${catalog.programs.length} program(s), ${catalog.audienceGroups.length} audience group(s), ${catalog.courses.length} course(s), and ${catalog.offerings.length} offering(s) from approved content.`,
);
