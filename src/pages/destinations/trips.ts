export interface TripRecord {
  date: string;
  destination: string;
  country: string;
  coordinates: [number, number];
  album: string;
}

export interface DestinationMetadata {
  country: string;
  coordinates: [number, number];
}

// The album API supplies names, dates, and photos, but not geographic coordinates.
// Add an entry here when a new Travel album introduces another destination.
export const destinationMetadata: Record<string, DestinationMetadata> = {
  kunming: { country: 'China', coordinates: [25.0389, 102.7183] },
  jiuzhaigou: { country: 'China', coordinates: [33.2601, 103.9186] },
  london: { country: 'United Kingdom', coordinates: [51.5072, -0.1276] },
  istanbul: { country: 'Türkiye', coordinates: [41.0082, 28.9784] },
};
