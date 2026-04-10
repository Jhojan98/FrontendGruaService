export interface DriverRecord {
  id: string;
  name: string;
  role: string;
  unit: string;
  status: 'Available' | 'On Trip' | 'Off Duty';
  shift: 'Morning' | 'Evening' | 'Night' | 'Rotating';
  phone: string;
  score: string;
  trips: string;
  image: string;
}

export interface DriverCreatePayload {
  name: string;
  role: string;
  unit: string;
  status: 'Available' | 'On Trip' | 'Off Duty';
  shift: 'Morning' | 'Evening' | 'Night' | 'Rotating';
  phone: string;
  score: number;
  trips: number;
  image_url?: string;
}

export interface DriverUpdatePayload {
  name?: string;
  role?: string;
  unit?: string;
  status?: 'Available' | 'On Trip' | 'Off Duty';
  shift?: 'Morning' | 'Evening' | 'Night' | 'Rotating';
  phone?: string;
  score?: number;
  trips?: number;
  image_url?: string;
}
