import type { Contacts } from './catalog';

export interface ContactContext {
  courseName?: string | undefined;
  gradeLabels: string[];
  programName: string;
}

export interface ContactLinks {
  email: string;
  message: string;
  phone: string;
  whatsapp: string;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function buildContactLinks(
  contacts: Contacts,
  context: ContactContext,
): ContactLinks {
  const groupContext = `${context.programName}, ${context.gradeLabels.join(', ')}`;
  const subject = context.courseName
    ? `שאלה לגבי הקורס ${context.courseName}`
    : `שאלה לגבי התוכנית ${context.programName}`;
  const message = context.courseName
    ? `שלום, יש לי שאלה לגבי הקורס ${context.courseName}, במסגרת ${groupContext}.`
    : `שלום, יש לי שאלה לגבי ${groupContext}.`;

  return {
    email: `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
    message,
    phone: `tel:${contacts.phone.replace(/[\s-]/g, '')}`,
    whatsapp: `https://wa.me/${digitsOnly(contacts.whatsapp)}?text=${encodeURIComponent(message)}`,
  };
}
