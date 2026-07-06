import apiClient from '../../../../services/apiClient';
import { DEFAULT_B2B_SECTIONS } from '../data/homepageFixtures';

const unwrapData = (response) => response?.data?.data ?? response?.data ?? null;

const normalizeSection = (section, index) => ({
  sectionType: section.sectionType,
  sectionKey: section.sectionKey ?? `${section.sectionType}_${index}`.toLowerCase(),
  title: section.title ?? null,
  subtitle: section.subtitle ?? null,
  config: section.config ?? {},
  sortOrder: Number(section.sortOrder ?? index),
});

export const homepageService = {
  // The homepage must never hard-fail: any error falls back to the default
  // layout so the shopkeeper always sees a working home screen.
  async getHomepage({ audience = 'B2B', metalId } = {}) {
    try {
      const response = await apiClient.get('/homepage', {
        params: {
          audience,
          ...(metalId ? { metalId } : {}),
        },
      });
      const data = unwrapData(response);
      const sections = (data?.sections ?? [])
        .map(normalizeSection)
        .sort((a, b) => a.sortOrder - b.sortOrder);
      if (!sections.length) {
        return { homepage: data?.homepage ?? null, sections: DEFAULT_B2B_SECTIONS, source: 'FALLBACK' };
      }
      return { homepage: data?.homepage ?? null, sections, source: data?.homepage?.source ?? 'PUBLISHED' };
    } catch (error) {
      return { homepage: null, sections: DEFAULT_B2B_SECTIONS, source: 'FALLBACK' };
    }
  },
};

export default homepageService;
