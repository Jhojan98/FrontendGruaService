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

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export interface DashboardStats {
  totalTripsToday: number;
  activeDispatches: number;
  availableUnits: {
    current: number;
    total: number;
  };
  totalRevenueToday: number;
}

export interface DashboardQuickAction {
  id: string;
  label: string;
}

export interface FleetTruck {
  id: string;
  unitNumber: string;
  type: string;
  status: string;
}

export interface CreateTripPayload {
  clientId: string;
  clientName?: string;
  originAddress: string;
  destinationAddress: string;
  distance?: string;
}
