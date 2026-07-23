import sanitizeHtmlLibrary from 'sanitize-html';

import type { Catalog } from '../domain';

export function sanitizeDescriptionHtml(value: string): string {
  return sanitizeHtmlLibrary(value, {
    allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
    allowedSchemes: ['https'],
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: 'a',
        attribs: { ...attributes, rel: 'noopener noreferrer' },
      }),
    },
    allowedAttributes: { a: ['href', 'title', 'rel'] },
  });
}

export function sanitizeCatalogHtml(catalog: Catalog): Catalog {
  return {
    ...catalog,
    programs: catalog.programs.map((program) => ({
      ...program,
      registrationInfoHtml:
        program.registrationInfoHtml === undefined
          ? undefined
          : sanitizeDescriptionHtml(program.registrationInfoHtml),
    })),
    audienceGroups: catalog.audienceGroups.map((group) => ({
      ...group,
      registrationInfoHtml:
        group.registrationInfoHtml === undefined
          ? undefined
          : sanitizeDescriptionHtml(group.registrationInfoHtml),
    })),
    courses: catalog.courses.map((course) => ({
      ...course,
      descriptionHtml: sanitizeDescriptionHtml(course.descriptionHtml),
    })),
  };
}
