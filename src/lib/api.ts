import {
  ApiError,
  Client,
  ClientCreatePayload,
  ClientHistoryEntry,
  ClientUpdatePayload,
  ClientVehicle,
  ClientVehicleCreatePayload,
  ClientVehicleUpdatePayload,
  CreateTripPayload,
  FleetTruck,
  FleetTruckCreatePayload,
  FleetTruckDriverAssignPayload,
  FleetTruckStatusUpdatePayload,
  FleetTruckUpdatePayload,
  LoginRequest,
  LoginResponse,
  Trip,
  TripAssignPayload,
  TripStatusUpdatePayload,
  UpdateMePayload,
  UserMe,
  DriverListItem,
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api/v1';
const TOKEN_STORAGE_KEY = 'auth_token';
export const SELECTED_CLIENT_ID_STORAGE_KEY = 'selected_client_id';
export const DISPATCH_PREFILL_CLIENT_ID_STORAGE_KEY = 'dispatch_prefill_client_id';

function buildHeaders(contentType: string | null = 'application/json'): HeadersInit {
  const headers: Record<string, string> = {};
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  return headers;
}

async function parseError(response: Response): Promise<never> {
  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  let message = `Request failed with status ${response.status}`;
  if (payload && typeof payload === 'object' && 'detail' in payload) {
    const detail = (payload as { detail: unknown }).detail;
    if (typeof detail === 'string') {
      message = detail;
    }
  }

  throw new ApiError(message, response.status, payload);
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  if (!response.ok) {
    await parseError(response);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function getMe(): Promise<UserMe> {
  return request<UserMe>('/users/me', {
    method: 'GET',
    headers: buildHeaders(null),
  });
}

export async function patchMe(payload: UpdateMePayload, profileImageFile?: File | null): Promise<UserMe> {
  if (profileImageFile) {
    const formData = new FormData();
    formData.append('file', profileImageFile);

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, String(value));
    });

    return request<UserMe>('/users/me', {
      method: 'PATCH',
      headers: buildHeaders(null),
      body: formData,
    });
  }

  return request<UserMe>('/users/me', {
    method: 'PATCH',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function listClients(): Promise<Client[]> {
  return request<Client[]>('/clients', {
    method: 'GET',
    headers: buildHeaders(null),
  });
}

export async function createClient(payload: ClientCreatePayload, logoFile?: File | null): Promise<Client> {
  if (logoFile) {
    const formData = new FormData();
    formData.append('file', logoFile);

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, String(value));
    });

    return request<Client>('/clients', {
      method: 'POST',
      headers: buildHeaders(null),
      body: formData,
    });
  }

  return request<Client>('/clients', {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function updateClient(clientId: string, payload: ClientUpdatePayload, logoFile?: File | null): Promise<Client> {
  if (logoFile) {
    const formData = new FormData();
    formData.append('file', logoFile);

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, String(value));
    });

    return request<Client>(`/clients/${clientId}`, {
      method: 'PATCH',
      headers: buildHeaders(null),
      body: formData,
    });
  }

  return request<Client>(`/clients/${clientId}`, {
    method: 'PATCH',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function deleteClient(clientId: string): Promise<void> {
  await request<void>(`/clients/${clientId}`, {
    method: 'DELETE',
    headers: buildHeaders(null),
  });
}

export async function listClientVehicles(clientId: string): Promise<ClientVehicle[]> {
  return request<ClientVehicle[]>(`/clients/${clientId}/vehicles`, {
    method: 'GET',
    headers: buildHeaders(null),
  });
}

export async function createClientVehicle(clientId: string, payload: ClientVehicleCreatePayload): Promise<ClientVehicle> {
  return request<ClientVehicle>(`/clients/${clientId}/vehicles`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function updateClientVehicle(
  clientId: string,
  vehicleId: string,
  payload: ClientVehicleUpdatePayload,
): Promise<ClientVehicle> {
  return request<ClientVehicle>(`/clients/${clientId}/vehicles/${vehicleId}`, {
    method: 'PATCH',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function deleteClientVehicle(clientId: string, vehicleId: string): Promise<void> {
  await request<void>(`/clients/${clientId}/vehicles/${vehicleId}`, {
    method: 'DELETE',
    headers: buildHeaders(null),
  });
}

export async function listClientHistory(clientId: string): Promise<ClientHistoryEntry[]> {
  return request<ClientHistoryEntry[]>(`/clients/${clientId}/history`, {
    method: 'GET',
    headers: buildHeaders(null),
  });
}

export async function listTrips(params?: { status?: string; date?: string }): Promise<Trip[]> {
  const query = new URLSearchParams();
  if (params?.status) {
    query.set('status', params.status);
  }
  if (params?.date) {
    query.set('date', params.date);
  }
  const suffix = query.toString() ? `?${query.toString()}` : '';
  return request<Trip[]>(`/trips${suffix}`, {
    method: 'GET',
    headers: buildHeaders(null),
  });
}

export async function getTrip(tripId: string): Promise<Trip> {
  return request<Trip>(`/trips/${tripId}`, {
    method: 'GET',
    headers: buildHeaders(null),
  });
}

export async function createTrip(payload: CreateTripPayload): Promise<Trip> {
  return request<Trip>('/trips', {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function updateTripStatus(tripId: string, payload: TripStatusUpdatePayload): Promise<Trip> {
  return request<Trip>(`/trips/${tripId}/status`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function assignTrip(tripId: string, payload: TripAssignPayload): Promise<Trip> {
  return request<Trip>(`/trips/${tripId}/assign`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function listFleet(): Promise<FleetTruck[]> {
  return request<FleetTruck[]>('/fleet', {
    method: 'GET',
    headers: buildHeaders(null),
  });
}

export async function getFleetTruck(truckId: string): Promise<FleetTruck> {
  return request<FleetTruck>(`/fleet/${truckId}`, {
    method: 'GET',
    headers: buildHeaders(null),
  });
}

export async function listDrivers(params?: { status?: string; unit?: string; search?: string }): Promise<DriverListItem[]> {
  const query = new URLSearchParams();
  if (params?.status) {
    query.set('status', params.status);
  }
  if (params?.unit) {
    query.set('unit', params.unit);
  }
  if (params?.search) {
    query.set('search', params.search);
  }
  const suffix = query.toString() ? `?${query.toString()}` : '';
  return request<DriverListItem[]>(`/drivers${suffix}`, {
    method: 'GET',
    headers: buildHeaders(null),
  });
}


export async function createFleetTruck(payload: FleetTruckCreatePayload, imageFile?: File | null): Promise<FleetTruck> {
  if (imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, String(value));
    });
    return request<FleetTruck>('/fleet', {
      method: 'POST',
      headers: buildHeaders(null),
      body: formData,
    });
  }

  return request<FleetTruck>('/fleet', {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function updateFleetTruck(truckId: string, payload: FleetTruckUpdatePayload, imageFile?: File | null): Promise<FleetTruck> {
  if (imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, String(value));
    });
    return request<FleetTruck>(`/fleet/${truckId}`, {
      method: 'PATCH',
      headers: buildHeaders(null),
      body: formData,
    });
  }

  return request<FleetTruck>(`/fleet/${truckId}`, {
    method: 'PATCH',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}


export async function assignFleetTruckDriver(
  truckId: string,
  payload: FleetTruckDriverAssignPayload,
): Promise<FleetTruck> {
  return request<FleetTruck>(`/fleet/${truckId}/driver`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function deleteFleetTruck(truckId: string): Promise<void> {
  await request<void>(`/fleet/${truckId}`, {
    method: 'DELETE',
    headers: buildHeaders(null),
  });
}

export async function deleteDriver(driverId: string): Promise<void> {
  await request<void>(`/drivers/${driverId}`, {
    method: 'DELETE',
    headers: buildHeaders(null),
  });
}

export async function updateFleetTruckStatus(
  truckId: string,
  payload: FleetTruckStatusUpdatePayload,
): Promise<FleetTruck> {
  return request<FleetTruck>(`/fleet/${truckId}/status`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
}
