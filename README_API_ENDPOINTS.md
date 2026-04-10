# Frontend Module Endpoints (Drivers, Fleet, History, Settings)

This document lists the exact API endpoints needed by the current frontend modules.

Base URL used by frontend:
- http://localhost:8000/api/v1

Auth model:
- Most endpoints require Authorization: Bearer <JWT>
- Admin-only endpoints are explicitly marked

## 1) Drivers Module

Current frontend screens under src/components/drivers need these endpoints.

### Required endpoints

| Method | Endpoint | Auth | Purpose | Status in backend |
|---|---|---|---|---|
| GET | /drivers | Bearer | List drivers for Drivers Management (supports filters/search) | Missing |
| GET | /drivers/{driver_id} | Bearer | Driver details screen | Missing |
| POST | /drivers | Bearer + admin | Add driver form submit | Missing |
| PATCH | /drivers/{driver_id} | Bearer + admin | Edit driver profile save | Missing |

### Recommended query params for list

- status=Available|On Trip|Off Duty
- shift=Morning|Evening|Night|Rotating
- unit=Unit-701
- search=free text

### Suggested minimum request/response contract

- GET /drivers response item:
  - id, name, role, unit, status, shift, phone, score, trips, image
- GET /drivers/{driver_id} response:
  - same fields as list + optional extended profile fields

## 2) Fleet Module

Current frontend screens under src/components/fleet use list/details/forms.

### Available today (implemented)

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | /fleet | Bearer | Fleet list |
| GET | /fleet/{truck_id} | Bearer | Truck details |
| GET | /fleet/locations | Bearer | Live map coordinates |

### Still required by current forms (missing)

| Method | Endpoint | Auth | Purpose | Status in backend |
|---|---|---|---|---|
| POST | /fleet | Bearer + admin | Create truck (Register New Vehicle) | Missing |
| PATCH | /fleet/{truck_id} | Bearer + admin | Edit truck profile | Missing |
| PUT | /fleet/{truck_id}/status | Bearer + admin | Change truck status | Missing at gateway (exists internally in fleet service) |

Notes:
- Internal fleet service already has PUT /internal/fleet/{truck_id}/status.
- Gateway currently exposes only GET fleet endpoints.

## 3) History Module

Current frontend screens under src/components/history use trip list and trip details.

### Available today (implemented)

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | /trips | Bearer | Trip history list |
| GET | /trips/{trip_id} | Bearer | Trip detail |

### Supported query params on /trips

- status (mapped to backend status filter)
- date (YYYY-MM-DD)

### Optional endpoints (not strictly required now)

| Method | Endpoint | Auth | Purpose | Status |
|---|---|---|---|---|
| GET | /trips/export | Bearer | CSV export button | Missing |

## 4) Settings Module

Current frontend screens include profile/preferences, internal user management, and tariff/billing admin panel.

### Available today (implemented)

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | /auth/login | Public | Sign in |
| GET | /users/me | Bearer | Load profile/settings |
| PATCH | /users/me | Bearer | Save own profile/preferences |
| GET | /users | Bearer + admin | Internal user table |
| POST | /users | Bearer + admin | Invite/create internal user |
| PATCH | /users/{target_user_id} | Bearer + admin | Update role/settings for user |
| GET | /notifications | Bearer | Notification panel data |

### Still required for Tariff & Billing panel (missing)

| Method | Endpoint | Auth | Purpose | Status in backend |
|---|---|---|---|---|
| GET | /settings/tariff-billing | Bearer + admin | Load current tariff config | Missing |
| PATCH | /settings/tariff-billing | Bearer + admin | Save tariff config changes | Missing |

Suggested tariff payload fields:
- heavy_duty_tow
- medium_duty_tow
- jumpstart
- roadside_assist
- cost_per_mile
- free_distance_threshold
- after_hours_surcharge
- fuel_surcharge_percent
- severe_weather_fee

## 5) Quick Mapping to Existing Backend

These endpoints are already present in gateway today and can be consumed immediately:

- History: GET /trips, GET /trips/{trip_id}
- Fleet: GET /fleet, GET /fleet/{truck_id}, GET /fleet/locations
- Settings profile/users: POST /auth/login, GET/PATCH /users/me, GET/POST /users, PATCH /users/{target_user_id}, GET /notifications

These are missing and must be added to fully support the new UI:

- Drivers: all /drivers endpoints
- Fleet writes: POST/PATCH fleet and gateway PUT status route
- Settings tariff: GET/PATCH tariff-billing routes
