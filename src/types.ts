export interface Client {
  id: string;
  name: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  contact_person: string | null;
  email: string | null;
  client_type: 'corporate' | 'individual';
  logo_url: string | null;
  last_service_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientVehicle {
  id: string;
  client_id: string;
  make: string;
  model: string;
  license_plate: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientHistoryEntry {
  id: string;
  date: string;
  service: string;
  revenue: number;
}

export interface ClientCreatePayload {
  name: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  contact_person: string;
  email: string;
  client_type: 'corporate' | 'individual';
  last_service_date?: string | null;
}

export interface ClientUpdatePayload {
  name?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'suspended';
  contact_person?: string | null;
  email?: string | null;
  client_type?: 'corporate' | 'individual';
  last_service_date?: string | null;
}

export interface ClientVehicleCreatePayload {
  make: string;
  model: string;
  license_plate: string;
  is_active: boolean;
}

export interface ClientVehicleUpdatePayload {
  make?: string;
  model?: string;
  license_plate?: string;
  is_active?: boolean;
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
