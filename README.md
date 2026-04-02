
# Terra Towing Dispatch - Fronend App & API Specification

This repository contains the frontend React application for the **Terra Towing Dispatch** system. To make this application completely functional, a backend server needs to be developed implementing the following RESTful API endpoints.

## 🚀 Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

---

## 📡 Required API Endpoints (Backend Specification)

To power the dashboard, fleet management, dispatch operations, and analytics, the backend should expose the following endpoints:

### 1. Dashboard & General Stats
Provides the high-level overview metrics seen on the home page.
* **`GET /api/v1/dashboard/stats`**
  * **Description:** Retrieves total trips today, active dispatches, available units, and total revenue.
* **`GET /api/v1/dashboard/quick-actions`**
  * **Description:** Fetches dynamically configured quick actions or recent alerts.

### 2. Trips & Live Dispatch
Handles the creation, assignment, and tracking of towing jobs.
* **`GET /api/v1/trips`**
  * **Query Params:** `?status=active,completed,pending`, `?date=YYYY-MM-DD`
  * **Description:** Lists trips based on status. Used in Trips History and Live Dispatch.
* **`GET /api/v1/trips/:id`**
  * **Description:** Fetches detailed information about a specific trip.
* **`POST /api/v1/trips`**
  * **Description:** Creates a new towing trip (New Trip dispatch).
  * **Payload:** Client ID, vehicle details, pickup/dropoff locations, priority.
* **`PUT /api/v1/trips/:id/status`**
  * **Description:** Updates the status of a trip (e.g., *Dispatched, En Route, In Progress, Completed*).
* **`PUT /api/v1/trips/:id/assign`**
  * **Description:** Assigns a specific tow truck/driver to a pending trip.

### 3. Fleet & Tow Trucks
Handles the management and real-time location monitoring of the truck fleet.
* **`GET /api/v1/fleet`**
  * **Description:** Retrieves the list of all tow trucks, with their current status (*Available, On Trip, Maintenance, Offline*).
* **`GET /api/v1/fleet/:id`**
  * **Description:** Details of a specific truck including maintenance history and assigned driver.
* **`GET /api/v1/fleet/locations`**
  * **Description:** Connects to a GPS/Telemetry service to return the real-time lat/lng coordinates of all active trucks for the Live Fleet Map. (Preferably handled via **WebSockets** or **SSE** for real-time updates).

### 4. Clients
Handles customer records, billing profiles, and historical data.
* **`GET /api/v1/clients`**
  * **Description:** Retrieves a list of all corporate and individual clients.
* **`POST /api/v1/clients`**
  * **Description:** Registers a new client.
* **`GET /api/v1/clients/:id/history`**
  * **Description:** Retrieves the service history and generated revenue for a specific client.

### 5. Analytics & Reports
Powers the charts and financial reporting views.
* **`GET /api/v1/analytics/revenue`**
  * **Query Params:** `?period=daily,weekly,monthly`
  * **Description:** Time-series data for revenue charts.
* **`GET /api/v1/analytics/performance`**
  * **Description:** Key performance indicators (ETA times, average trip duration, job completion rates).

### 6. Users & Authentication (Settings)
Handles dispatcher authentication and system settings.
* **`POST /api/v1/auth/login`**
  * **Description:** Authenticates a dispatcher/admin and returns a JWT token.
* **`GET /api/v1/users/me`**
  * **Description:** Gets the current user's profile and preferences (like default view, timezone).
* **`GET /api/v1/notifications`**
  * **Description:** Retrieves the unread notification count (for the top-right Bell icon).

---
*Generated based on current UI components and expected data structures.*
