export type Resort = {
  slug: string;
  name: string;
  location: string;
  tagline: string;
  story: string;
  hero: string;
  cover: string;
  gallery: string[];
  coords: { lat: number; lng: number };
  highlights: string[];
};

export const resorts: Resort[] = [
  {
    slug: 'alibaug',
    name: 'Shauryawada Alibaug',
    location: 'Alibaug, Maharashtra',
    tagline: 'Where the Arabian Sea meets stillness.',
    story: 'A coastal sanctuary of whitewashed villas, palm courtyards and a private stretch of monsoon-grey shore. Mornings begin with salt air; nights fold into firelit terraces.',
    hero: '/images/Untitled-design-32-1536x864.png',
    cover: '/images/Untitled-design-52-1536x864.png',
    gallery: [
      '/images/Untitled-design-32-1536x864.png',
      '/images/Untitled-design-52-1536x864.png',
      '/images/Untitled-design-53-1536x1152.png',
      '/images/Untitled-design-54-1536x864.png',
      '/images/01-1536x1485.png',
    ],
    coords: { lat: 18.6414, lng: 72.8722 },
    highlights: ['Private beach cove', 'Open-air spa', 'Coastal tasting menu', 'Sunset infinity pool'],
  },
  {
    slug: 'pune',
    name: 'Shauryawada Pune',
    location: 'Mulshi Valley, Pune',
    tagline: 'A modern retreat folded into the Sahyadris.',
    story: 'Architectural cottages perched above the Mulshi reservoir. A study in stone, teak and silence — built for unhurried weekends and clear-headed mornings.',
    hero: '/images/Untitled-design-36-864x1536.png',
    cover: '/images/02-1534x1536.png',
    gallery: [
      '/images/Untitled-design-36-864x1536.png',
      '/images/02-1534x1536.png',
      '/images/02-1024x1024.png',
      '/images/Untitled-design-53-1024x768.png',
    ],
    coords: { lat: 18.5204, lng: 73.8567 },
    highlights: ['Reservoir views', 'Forest trail walks', 'Stone-fired kitchen', 'Yoga deck at dawn'],
  },
  {
    slug: 'mahabaleshwar',
    name: 'Shauryawada Mahabaleshwar',
    location: 'Panchgani Hills',
    tagline: 'A cinematic hill-station hideaway in the clouds.',
    story: 'Glass-walled cottages drifting above strawberry valleys. Wake to mist, drink to sunsets, sleep beneath constellations.',
    hero: '/images/03-1536x1536.png',
    cover: '/images/03-1024x1024.png',
    gallery: [
      '/images/03-1536x1536.png',
      '/images/03-1024x1024.png',
      '/images/01-1536x1485.png',
      '/images/Untitled-design-54-1536x864.png',
    ],
    coords: { lat: 17.9237, lng: 73.6580 },
    highlights: ['Cliffside infinity tubs', 'Star-deck dinners', 'Strawberry-farm breakfasts', 'Cloud-walk trail'],
  },
];

export const getResort = (slug: string) => resorts.find((r) => r.slug === slug);
