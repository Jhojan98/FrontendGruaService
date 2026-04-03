import {
  ApiError,
  Client,
  ClientCreatePayload,
  ClientHistoryEntry,
  ClientUpdatePayload,
  ClientVehicle,
  ClientVehicleCreatePayload,
  ClientVehicleUpdatePayload,
  LoginRequest,
  LoginResponse,
  UpdateMePayload,
  UserMe,
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
