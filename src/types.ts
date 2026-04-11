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
  driverId?: string | null;
  driverName?: string | null;
}

export interface CreateTripPayload {
  clientId: string;
  clientName?: string;
  originAddress: string;
  destinationAddress: string;
  distance?: string;
}

export interface TripStatusUpdatePayload {
  status: string;
}

export interface TripAssignPayload {
  towTruck: string;
}

export interface FleetTruck {
  id: string;
  unitNumber: string;
  type: string;
  status: 'Available' | 'On Trip' | 'Maintenance';
  imageUrl?: string | null;
  lat?: number;
  lng?: number;
  assignedDriverId?: string | null;
  assignedDriverName?: string | null;
  assignedDriverStatus?: 'Available' | 'On Trip' | 'Off Duty' | null;
  assignedDriverImage?: string | null;
}

export interface FleetTruckCreatePayload {
  unitNumber: string;
  type: string;
  status?: 'Available' | 'On Trip' | 'Maintenance';
  lat?: number;
  lng?: number;
}

export interface FleetTruckUpdatePayload {
  unitNumber?: string;
  type?: string;
  status?: 'Available' | 'On Trip' | 'Maintenance';
  lat?: number;
  lng?: number;
}

export interface FleetTruckStatusUpdatePayload {
  status: 'Available' | 'On Trip' | 'Maintenance';
}

export interface FleetTruckDriverAssignPayload {
  driverId: string;
}

export interface DriverListItem {
  id: string;
  name: string;
  role: string;
  unit: string;
  status: 'Available' | 'On Trip' | 'Off Duty';
  shift: 'Morning' | 'Evening' | 'Night' | 'Rotating';
  phone: string;
  assignedTruckId?: string | null;
  assignedTruckUnit?: string | null;
  assignedTruckType?: string | null;
  assignedTruckStatus?: string | null;
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
