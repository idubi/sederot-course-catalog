import { describe, expect, it } from 'vitest';

import { buildContactLinks } from './contact-links';

const contacts = {
  phone: '+972 8-1234567',
  whatsapp: '+972 50-1234567',
  email: 'center@example.org',
};

describe('contact links', () => {
  it('creates valid phone and WhatsApp links with program context', () => {
    const links = buildContactLinks(contacts, {
      programName: 'מחוננים',
      gradeLabels: ['כיתה ה׳'],
    });

    expect(links.phone).toBe('tel:+97281234567');
    const whatsapp = new URL(links.whatsapp);
    expect(whatsapp.hostname).toBe('wa.me');
    expect(whatsapp.pathname).toBe('/972501234567');
    expect(whatsapp.searchParams.get('text')).toContain('מחוננים, כיתה ה׳');
  });

  it('adds course and owning-group context to WhatsApp and email', () => {
    const links = buildContactLinks(contacts, {
      programName: 'מצטיינים',
      gradeLabels: ['כיתה ו׳'],
      courseName: 'כתיבה יוצרת',
    });

    expect(new URL(links.whatsapp).searchParams.get('text')).toBe(
      links.message,
    );
    const query = new URLSearchParams(links.email.split('?')[1]);
    expect(query.get('subject')).toBe('שאלה לגבי הקורס כתיבה יוצרת');
    expect(query.get('body')).toContain(
      'כתיבה יוצרת, במסגרת מצטיינים, כיתה ו׳',
    );
  });
});
