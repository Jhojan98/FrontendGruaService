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
