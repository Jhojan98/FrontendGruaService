import { getAuthToken } from '../../lib/api';
import type { DriverRecord, DriverCreatePayload, DriverUpdatePayload } from './driversTypes';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function buildHeadersWithoutContentType(): HeadersInit {
  const headers: Record<string, string> = {};
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function toApiError(response: Response, fallback: string): Promise<Error> {
  try {
    const payload = await response.json();
    if (payload && typeof payload === 'object' && 'detail' in payload) {
      const detail = (payload as { detail: unknown }).detail;
      if (typeof detail === 'string') {
        return new Error(detail);
      }
    }
  } catch {
    // Ignore JSON parse errors and fallback to generic message.
  }
  return new Error(`${fallback}: ${response.status} ${response.statusText}`);
}

function normalizeDriver(driver: any): DriverRecord {
  return {
    id: driver.id,
    name: driver.name,
    role: driver.role,
    unit: driver.unit,
    status: driver.status,
    shift: driver.shift,
    phone: driver.phone,
    score: String(driver.score),
    trips: String(driver.trips),
    image: driver.image || driver.image_url || '',
  };
}

export async function fetchDrivers(params?: {
  status?: string;
  shift?: string;
  unit?: string;
  search?: string;
}): Promise<DriverRecord[]> {
  const url = new URL(`${API_BASE_URL}/drivers`);
  if (params?.status) url.searchParams.set('status', params.status);
  if (params?.shift) url.searchParams.set('shift', params.shift);
  if (params?.unit) url.searchParams.set('unit', params.unit);
  if (params?.search) url.searchParams.set('search', params.search);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw await toApiError(response, 'Failed to fetch drivers');
  }

  const data = await response.json();
  return data.map(normalizeDriver);
}

export async function fetchDriver(driverId: string): Promise<DriverRecord> {
  const response = await fetch(`${API_BASE_URL}/drivers/${driverId}`, {
    method: 'GET',
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw await toApiError(response, 'Failed to fetch driver');
  }

  const data = await response.json();
  return normalizeDriver(data);
}

export async function createDriver(payload: DriverCreatePayload, imageFile?: File | null): Promise<DriverRecord> {
  let response: Response;
  if (imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, String(value));
    });
    response = await fetch(`${API_BASE_URL}/drivers`, {
      method: 'POST',
      headers: buildHeadersWithoutContentType(),
      body: formData,
    });
  } else {
    response = await fetch(`${API_BASE_URL}/drivers`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });
  }

  if (!response.ok) {
    throw await toApiError(response, 'Failed to create driver');
  }

  const data = await response.json();
  return normalizeDriver(data);
}

export async function updateDriver(driverId: string, payload: DriverUpdatePayload, imageFile?: File | null): Promise<DriverRecord> {
  let response: Response;
  if (imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, String(value));
    });
    response = await fetch(`${API_BASE_URL}/drivers/${driverId}`, {
      method: 'PATCH',
      headers: buildHeadersWithoutContentType(),
      body: formData,
    });
  } else {
    response = await fetch(`${API_BASE_URL}/drivers/${driverId}`, {
      method: 'PATCH',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });
  }

  if (!response.ok) {
    throw await toApiError(response, 'Failed to update driver');
  }

  const data = await response.json();
  return normalizeDriver(data);
}
