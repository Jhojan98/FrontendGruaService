import type { AuthUser, CreateTripPayload, DashboardQuickAction, DashboardStats, FleetTruck, Trip } from '../types';
import { getAccessToken } from './auth';

type IntegrationMode = 'mock' | 'backend';

function resolveIntegrationMode(): IntegrationMode {
  const rawMode = String(import.meta.env.VITE_INTEGRATION_MODE || 'mock').toLowerCase();
  if (rawMode.startsWith('back')) {
    return 'backend';
  }
  return 'mock';
}

const integrationMode = resolveIntegrationMode();
const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

const MOCK_USERS: Record<string, { password: string; profile: AuthUser }> = {
  'admin@terra.local': {
    password: 'admin123',
    profile: {
      id: '1',
      email: 'admin@terra.local',
      full_name: 'Admin User',
      role: 'admin',
    },
  },
  'dispatcher@terra.local': {
    password: 'dispatch123',
    profile: {
      id: '2',
      email: 'dispatcher@terra.local',
      full_name: 'Dispatch User',
      role: 'dispatcher',
    },
  },
};

const MOCK_STATS: DashboardStats = {
  totalTripsToday: 48,
  activeDispatches: 5,
  availableUnits: { current: 7, total: 12 },
  totalRevenueToday: 4820.5,
};

const MOCK_QUICK_ACTIONS: DashboardQuickAction[] = [
  { id: 'new-trip', label: 'Create New Trip' },
  { id: 'fleet-map', label: 'Open Live Fleet Map' },
  { id: 'assign-pending', label: 'Assign Pending Trips' },
];

async function request<T>(path: string, init: RequestInit = {}, requiresAuth = true): Promise<T> {
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');

  if (requiresAuth) {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Missing session token');
    }
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.detail) {
        detail = String(body.detail);
      }
    } catch {
      // Keep fallback message if body is not JSON.
    }
    throw new Error(detail);
  }

  return (await response.json()) as T;
}

export function isBackendMode(): boolean {
  return integrationMode === 'backend';
}

export async function login(email: string, password: string): Promise<string> {
  if (integrationMode === 'mock') {
    const user = MOCK_USERS[email.toLowerCase()];
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    return `mock-token:${user.profile.id}`;
  }

  const response = await request<{ access_token: string }>(
    '/api/v1/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    false,
  );
  return response.access_token;
}

export async function getCurrentUser(): Promise<AuthUser> {
  if (integrationMode === 'mock') {
    const token = getAccessToken();
    const match = token?.match(/^mock-token:(.+)$/);
    if (!match) {
      throw new Error('Invalid mock session');
    }
    const profile = Object.values(MOCK_USERS).find((candidate) => candidate.profile.id === match[1])?.profile;
    if (!profile) {
      throw new Error('Invalid mock session');
    }
    return profile;
  }

  return request<AuthUser>('/api/v1/users/me');
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (integrationMode === 'mock') {
    return MOCK_STATS;
  }
  return request<DashboardStats>('/api/v1/dashboard/stats');
}

export async function getDashboardQuickActions(): Promise<DashboardQuickAction[]> {
  if (integrationMode === 'mock') {
    return MOCK_QUICK_ACTIONS;
  }
  const response = await request<{ actions: DashboardQuickAction[] }>('/api/v1/dashboard/quick-actions');
  return response.actions;
}

export async function listClients(): Promise<Array<{ id: string; name: string; membership: string; phone: string }>> {
  if (integrationMode === 'mock') {
    return [
      { id: 'c1', name: 'Aria Montgomery', membership: 'Premium', phone: '(503) 555-0123' },
      { id: 'c2', name: 'Ezra Fitz', membership: 'Standard', phone: '(503) 555-0456' },
      { id: 'c3', name: 'Hanna Marin', membership: 'Gold', phone: '(503) 555-0789' },
    ];
  }
  return request<Array<{ id: string; name: string; membership: string; phone: string }>>('/api/v1/clients');
}

export async function createClient(payload: {
  name: string;
  membership: string;
  phone: string;
}): Promise<{ id: string; name: string; membership: string; phone: string }> {
  if (integrationMode === 'mock') {
    return {
      id: `c-${Math.random().toString(36).slice(2, 9)}`,
      ...payload,
    };
  }

  return request<{ id: string; name: string; membership: string; phone: string }>(
    '/api/v1/clients',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export function getIntegrationMode(): IntegrationMode {
  return integrationMode;
}

export async function listFleet(): Promise<FleetTruck[]> {
  if (integrationMode === 'mock') {
    return [
      { id: 't-1', unitNumber: 'Unit-701', type: 'Flatbed', status: 'Available' },
      { id: 't-2', unitNumber: 'Unit-702', type: 'Hook', status: 'On Trip' },
      { id: 't-3', unitNumber: 'Unit-703', type: 'Heavy', status: 'Available' },
    ];
  }
  return request<FleetTruck[]>('/api/v1/fleet');
}

export async function createTrip(payload: CreateTripPayload): Promise<Trip> {
  if (integrationMode === 'mock') {
    return {
      id: `tr-${Math.random().toString(36).slice(2, 9)}`,
      clientId: payload.clientId,
      clientName: payload.clientName || 'Unknown Client',
      origin: payload.originAddress,
      destination: payload.destinationAddress,
      distance: payload.distance || '0 km',
      status: 'Pending',
      towTruck: 'Unassigned',
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
    };
  }

  return request<Trip>(
    '/api/v1/trips',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}
