export interface TripRecord {
  date: string;
  destination: string;
  country: string;
  coordinates: [number, number] | null;
  album: string;
}
