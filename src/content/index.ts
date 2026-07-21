export {
  academicYearSchema,
  audienceGroupSchema,
  catalogIdSchema,
  catalogSchema,
  contactsSchema,
  courseOfferingSchema,
  courseSchema,
  imageAssetSchema,
  programSchema,
  registrationTargetSchema,
  validateCatalog,
} from './schema';

export { APPROVED_CATALOG_PATH, loadApprovedCatalog } from './catalog-loader';

export type { ValidatedCatalog } from './schema';
