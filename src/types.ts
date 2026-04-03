export interface Client {
  id: string;
  name: string;
  membership: string;
  phone: string;
}

export interface Base {
  id: string;
  name: string;
}

export interface Trip {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  origin: string;
  destination: string;
  distance: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Cancelled';
  towTruck: string;
  date: string;
  time: string;
}

export interface DispatchFormData {
  baseId: string;
  serviceType: string;
  urgency: 'Normal' | 'High';
  incidentType: string;
  description: string;
  clientId: string;
  originAddress: string;
  destinationAddress: string;
  vehicleYearMakeModel: string;
  vehicleColorPlate: string;
  occupants: number;
}

export type UserRole = 'admin' | 'dispatcher';
export type ThemeMode = 'light' | 'dark';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserMe {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  profile_image_url: string | null;
  theme: ThemeMode;
  language: string;
  email_alerts: boolean;
  sms_urgent_alerts: boolean;
  browser_notifications: boolean;
  employee_id: string | null;
  office_location: string | null;
}

export interface UpdateMePayload {
  email?: string;
  full_name?: string;
  profile_image_url?: string | null;
  theme?: ThemeMode;
  language?: string;
  email_alerts?: boolean;
  sms_urgent_alerts?: boolean;
  browser_notifications?: boolean;
  employee_id?: string | null;
  office_location?: string | null;
}

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}
