export type CatalogId = string;

export type ProgramId = CatalogId;
export type AudienceGroupId = CatalogId;
export type CourseId = CatalogId;
export type CourseOfferingId = CatalogId;
export type RegistrationTargetId = CatalogId;
export type GradeGroupId = CatalogId;

export type ProgramCategory = 'gifted' | 'excellence';
export type AudienceGender = 'boys' | 'girls' | 'mixed';
export type Semester = 'annual' | 'first' | 'second';

export interface AcademicYear {
  id: string;
  label: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number | undefined;
  height?: number | undefined;
  sourceNote?: string | undefined;
}

export interface Program {
  id: ProgramId;
  name: string;
  category: ProgramCategory;
  defaultRegistrationTargetId?: RegistrationTargetId | undefined;
}

export interface AudienceGroup {
  id: AudienceGroupId;
  programId: ProgramId;
  gradeGroupId: GradeGroupId;
  gradeLabels: string[];
  gradeValues: string[];
  gender: AudienceGender;
  day: string;
  startTime: string;
  endTime: string;
  registrationTargetId?: RegistrationTargetId | undefined;
}

export interface Course {
  id: CourseId;
  name: string;
  shortName: string;
  descriptionHtml: string;
  instructors: string[];
  defaultImage?: ImageAsset | undefined;
}

export interface CourseOffering {
  id: CourseOfferingId;
  courseId: CourseId;
  audienceGroupId: AudienceGroupId;
  semester: Semester;
  displayOrder: number;
  imageOverride?: ImageAsset | undefined;
}

export interface RegistrationTarget {
  id: RegistrationTargetId;
  type: string;
  label: string;
  url: string;
  enabled: boolean;
}

export interface Contacts {
  phone: string;
  whatsapp: string;
  email: string;
}

export interface Catalog {
  schemaVersion: '1.0';
  academicYear: AcademicYear;
  programs: Program[];
  audienceGroups: AudienceGroup[];
  courses: Course[];
  offerings: CourseOffering[];
  registrationTargets: RegistrationTarget[];
  contacts: Contacts;
}
