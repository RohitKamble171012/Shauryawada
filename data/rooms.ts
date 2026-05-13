export type RoomStatus = 'available' | 'booked' | 'selected' | 'maintenance';

export type Room = {
  id: string;
  resortSlug: string;
  name: string;
  type: 'Cottage' | 'Suite' | 'Villa' | 'Pavilion';
  capacity: number;
  pricePerNight: number;
  image: string;
  status: RoomStatus;
  // 3D position [x, z] on a 12x12 grid centered at origin
  position: [number, number];
  features: string[];
};

const img = (n: number) => {
  const pool = [
    '/images/Untitled-design-32-1024x576.png',
    '/images/Untitled-design-52-1024x576.png',
    '/images/Untitled-design-53-1024x768.png',
    '/images/Untitled-design-54-1024x576.png',
    '/images/01-1024x990.png',
    '/images/02-1024x1024.png',
    '/images/03-1024x1024.png',
    '/images/Untitled-design-36-768x1365.png',
  ];
  return pool[n % pool.length];
};

const make = (resortSlug: string, prefix: string, items: Array<Partial<Room> & { id: string; position: [number, number] }>): Room[] =>
  items.map((it, i) => ({
    resortSlug,
    name: it.name ?? `${prefix} ${it.id}`,
    type: it.type ?? 'Cottage',
    capacity: it.capacity ?? 2,
    pricePerNight: it.pricePerNight ?? 18000,
    image: it.image ?? img(i + prefix.length),
    status: it.status ?? 'available',
    features: it.features ?? ['Private deck', 'Rain shower', 'King bed', 'Valley view'],
    ...it,
  }));

export const rooms: Room[] = [
  ...make('alibaug', 'Coastal', [
    { id: 'A1', position: [-3.5, -2.5], type: 'Villa', name: 'Coral Villa', pricePerNight: 32000, capacity: 4 },
    { id: 'A2', position: [-1.2, -2.5], type: 'Suite', name: 'Tide Suite', pricePerNight: 22000, status: 'booked' },
    { id: 'A3', position: [1.2, -2.5], type: 'Suite', name: 'Salt Suite', pricePerNight: 22000 },
    { id: 'A4', position: [3.5, -2.5], type: 'Villa', name: 'Driftwood Villa', pricePerNight: 30000, capacity: 4 },
    { id: 'A5', position: [-2.5, 1], type: 'Cottage', name: 'Palm Cottage', pricePerNight: 16000 },
    { id: 'A6', position: [0, 1], type: 'Pavilion', name: 'Beach Pavilion', pricePerNight: 28000, capacity: 6 },
    { id: 'A7', position: [2.5, 1], type: 'Cottage', name: 'Shell Cottage', pricePerNight: 16000, status: 'maintenance' },
    { id: 'A8', position: [-1, 3.2], type: 'Suite', name: 'Lagoon Suite', pricePerNight: 24000 },
    { id: 'A9', position: [1.8, 3.2], type: 'Suite', name: 'Horizon Suite', pricePerNight: 24000, status: 'booked' },
  ]),
  ...make('pune', 'Hill', [
    { id: 'P1', position: [-3, -2], type: 'Cottage', name: 'Stone Cottage 1', pricePerNight: 14000 },
    { id: 'P2', position: [-1, -2], type: 'Cottage', name: 'Stone Cottage 2', pricePerNight: 14000, status: 'booked' },
    { id: 'P3', position: [1, -2], type: 'Suite', name: 'Teak Suite', pricePerNight: 19000 },
    { id: 'P4', position: [3, -2], type: 'Suite', name: 'Reservoir Suite', pricePerNight: 21000 },
    { id: 'P5', position: [-2, 1.5], type: 'Villa', name: 'Mulshi Villa', pricePerNight: 28000, capacity: 4 },
    { id: 'P6', position: [0.5, 1.5], type: 'Pavilion', name: 'Forest Pavilion', pricePerNight: 26000, capacity: 6 },
    { id: 'P7', position: [3, 1.5], type: 'Cottage', name: 'Pine Cottage', pricePerNight: 15000, status: 'maintenance' },
  ]),
  ...make('mahabaleshwar', 'Cloud', [
    { id: 'M1', position: [-3, -2.5], type: 'Suite', name: 'Mist Suite', pricePerNight: 20000 },
    { id: 'M2', position: [0, -2.5], type: 'Villa', name: 'Cloud Villa', pricePerNight: 34000, capacity: 4 },
    { id: 'M3', position: [3, -2.5], type: 'Suite', name: 'Strawberry Suite', pricePerNight: 22000, status: 'booked' },
    { id: 'M4', position: [-2, 1], type: 'Cottage', name: 'Valley Cottage', pricePerNight: 17000 },
    { id: 'M5', position: [0.5, 1], type: 'Pavilion', name: 'Star Pavilion', pricePerNight: 30000, capacity: 6 },
    { id: 'M6', position: [3, 1], type: 'Cottage', name: 'Cliff Cottage', pricePerNight: 18000 },
    { id: 'M7', position: [-1, 3.2], type: 'Suite', name: 'Sunrise Suite', pricePerNight: 23000, status: 'booked' },
  ]),
];

export const roomsForResort = (slug: string) => rooms.filter((r) => r.resortSlug === slug);
export const getRoom = (id: string) => rooms.find((r) => r.id === id);
