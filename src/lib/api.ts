// src/lib/api.ts
const API_BASE = '/api';

export interface TruckLocation {
  _id: string;
  truckId: string;
  lat: number;
  lng: number;
  speed: number;
  timestamp: string;
}

export interface TruckStatus {
  truckId: string;
  driverId: string;
  driverStatus: 'awake' | 'drowsy';
  fuelLevel: number;
  lastLocation: {
    lat: number;
    lng: number;
    timestamp: string;
  };
}

export const fetchAllTruckLocations = async (): Promise<TruckLocation[]> => {
  const res = await fetch(`${API_BASE}/gps/all`);
  if (!res.ok) throw new Error('Failed to fetch locations');
  return res.json();
};

export const fetchTruckLocation = async (truckId: string): Promise<TruckLocation> => {
  const res = await fetch(`${API_BASE}/gps/${truckId}`);
  if (!res.ok) throw new Error(`Truck ${truckId} not found`);
  return res.json();
};