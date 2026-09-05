export interface TripRecord {
  date: string;
  destination: string;
  country: string;
  coordinates: [number, number];
  album: string;
}

// Edit this array to add, remove, or reorder trips on the globe and timeline.
export const tripRecords: TripRecord[] = [
  { date: '2025-10-01', destination: 'Kunming', country: 'China', coordinates: [25.0389, 102.7183], album: '2025.10-Kunming' },
  { date: '2025-05-02', destination: 'Jiuzhaigou', country: 'China', coordinates: [33.2601, 103.9186], album: '2025.05-jiuzhaigou' },
  { date: '2024-10-06', destination: 'London', country: 'United Kingdom', coordinates: [51.5072, -0.1276], album: '2024.10-London' },
  { date: '2023-10-01', destination: 'Istanbul', country: 'Türkiye', coordinates: [41.0082, 28.9784], album: '2023.10-Istanbul' },
];
