# Terra Towing Dispatch - Frontend Application

A modern, responsive React-based dispatch management system for towing operations, featuring real-time fleet tracking, trip management, and analytics.

## 🚀 Quick Start

**Prerequisites:** Node.js (v18 or higher)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` (if available)
   - Update the API base URL to point to your backend service

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

The application will be available at `http://localhost:5173` (or the port shown in the console).

---

## 🏗️ Architecture Overview

### Tech Stack

- **React 19** - UI framework with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling with dark mode support
- **Lucide React** - Icon library
- **Framer Motion** - Animations
- **i18next** - Internationalization support
- **Express** - Backend-for-frontend (BFF) server for development

### Project Structure

```
FrontendGruaService/
├── src/
│   ├── components/        # React components organized by feature
│   │   ├── clients/       # Client management screens
│   │   ├── drivers/       # Driver management screens
│   │   ├── fleet/         # Fleet management screens
│   │   ├── history/       # Trip history and details
│   │   ├── settings/      # Settings, user management, billing
│   │   └── ui/            # Reusable UI components
│   ├── contexts/          # React contexts (Auth, etc.)
│   ├── lib/               # Utilities and helper functions
│   ├── App.tsx            # Main application router
│   ├── i18n.ts            # Internationalization config
│   ├── main.tsx           # Application entry point
│   └── types.ts           # TypeScript type definitions
├── server.ts              # Express dev server
├── vite.config.ts         # Vite configuration
└── package.json
```

---

## 📱 How It Works

### Application Flow

1. **Authentication Layer**
   - Users are greeted with a login screen on startup
   - JWT-based authentication via `AuthContext`
   - Protected routes ensure only authenticated users access the dashboard
   - Session persistence across page refreshes

2. **Navigation & Routing**
   - Client-side routing using view state (no page reloads)
   - **Sidebar navigation** (desktop) with 8 main sections:
     - Home Dashboard
     - Live Dispatch
     - Trips History
     - Clients
     - Drivers
     - Fleet (Tow Trucks)
     - Analytics
     - Settings & Support
   - **Mobile responsive** with bottom navigation bar and full slide-out menu

3. **State Management**
   - **React Context** for global state (authentication, theme)
   - **Local state** with `useState` for component-specific data
   - **Props drilling** for parent-child communication
   - Data fetching happens at component level with API calls

4. **Theming & UI**
   - **Dark/Light mode** toggle with system preference detection
   - Theme preference saved to `localStorage` for persistence
   - Material Design-inspired color system
   - Responsive design: mobile-first with desktop sidebar layout

### Key Modules

#### 🏠 Home Dashboard (`HomeDashboard`)
- Central hub displaying KPIs and metrics
- Shows active trips, available units, revenue stats
- Quick action buttons for common tasks
- Real-time status indicators

#### 📍 Live Dispatch (`DispatchForm` + `MapSection`)
- Split-screen layout: map on left, dispatch form on right
- Interactive map showing real-time truck locations
- New trip creation form with client, vehicle, and location details
- Priority assignment and status tracking
- Responsive: stacks vertically on mobile

#### 📜 Trip History (`HistoryManagement`)
- Filterable list of past and active trips
- Search by date, status, client
- Detailed trip view with full timeline
- Export capabilities (CSV)

#### 👥 Client Management (`ClientManagement`)
- Client directory with search and filtering
- Client profiles with service history
- Revenue tracking per client
- Add/edit client functionality

#### 🚗 Driver Management (`DriverManagement`)
- Driver roster with status indicators
- Shift and unit assignments
- Performance metrics and trip counts
- Driver profiles with contact information

#### 🚛 Fleet Management (`FleetManagement`)
- Complete truck inventory with status tracking
- Real-time GPS locations via `/fleet/locations`
- Maintenance history tracking
- Truck details: capacity, equipment, assigned driver

#### 📊 Fleet Analytics (`FleetAnalytics`)
- Revenue charts over time (daily/weekly/monthly)
- Performance metrics: ETA, trip duration, completion rates
- Visual charts and data visualizations

#### ⚙️ Settings (`SettingsPage`)
- **Profile Settings**: User preferences, timezone, default view
- **Internal User Management**: Admin panel for managing dispatchers
- **Tariff & Billing Admin**: Configure pricing, surcharges, fees
- Notification preferences

#### 🎧 Support Center (`SupportCenter`)
- Help documentation
- Contact information
- System status

### UI Components

- **Layout**: Main application shell with header, sidebar, and content area
- **MapSection**: Map integration for live fleet tracking
- **NotificationsPanel**: Bell icon dropdown with alerts
- **ProtectedRoute**: Auth guard for protected views
- **SimplifiedProfileMenu**: User profile dropdown with logout

---

## 🔌 Backend Integration

The frontend communicates with a REST API backend via HTTP requests with JWT authentication.

**Base URL**: Configured via environment variable (default: `http://localhost:8000/api/v1`)

**Auth Model**: Bearer token in `Authorization` header for protected endpoints

### Module-to-Endpoint Mapping

| Frontend Module | API Endpoints Used |
|----------------|-------------------|
| Dashboard | `GET /dashboard/stats`, `GET /dashboard/quick-actions` |
| Trips/Dispatch | `GET /trips`, `POST /trips`, `PUT /trips/:id/status`, `PUT /trips/:id/assign` |
| Fleet | `GET /fleet`, `GET /fleet/:id`, `GET /fleet/locations` |
| Clients | `GET /clients`, `POST /clients`, `GET /clients/:id/history` |
| Drivers | `GET /drivers`, `GET /drivers/:id`, `POST /drivers`, `PATCH /drivers/:id` |
| Analytics | `GET /analytics/revenue`, `GET /analytics/performance` |
| Auth/Users | `POST /auth/login`, `GET/PATCH /users/me`, `GET /notifications` |
| Settings | `GET/POST /users` (admin), `GET/PATCH /settings/tariff-billing` (admin) |

**Note**: Some endpoints may not yet be implemented in the backend. See `README_API_ENDPOINTS.md` for detailed API specification and implementation status.

---

## 🎨 Design System

### Color Tokens
- `primary` / `on-primary` - Main brand color and contrasting text
- `background` / `on-background` - Page background and default text
- `surface` / `on-surface` - Component backgrounds
- `error` / `warning` / `success` - Status indicators
- `outline-variant` - Border colors

### Typography
- **Headline**: Bold, larger fonts for titles
- **Body**: Regular weight for content
- **Label**: Small, uppercase for tags and badges

### Spacing & Layout
- Sidebar: 256px (64 Tailwind units)
- Header: 64px height
- Consistent spacing using Tailwind's spacing scale
- Card-based layouts with rounded corners and subtle shadows

---

## 🌍 Internationalization

The application supports multiple languages via `i18next`:

- Translation keys used throughout components: `t('key')`
- Language files configured in `i18n.ts`
- Easy to add new languages by adding translation JSON files

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start dev server with Express + Vite
npm run build     # Build for production
npm run preview   # Preview production build
npm run clean     # Remove dist folder
npm run lint      # TypeScript type checking
```

### Code Conventions

- **TypeScript strict mode** enabled
- Functional components with hooks
- Props interfaces defined inline or in `types.ts`
- Utility functions in `src/lib/utils.ts`
- Component files named in PascalCase
- Tailwind CSS with `clsx` and `tailwind-merge` for conditional classes

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Bottom navigation, stacked layouts
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px - Full sidebar navigation, side-by-side layouts

### Mobile Features
- Hamburger menu with full navigation overlay
- Bottom navigation bar with 4 primary sections
- Touch-friendly button sizes
- Safe area padding for notched devices

---

## 🔐 Security Considerations

- JWT tokens stored securely (check `AuthContext.tsx` for implementation)
- Protected routes prevent unauthorized access
- Admin-only endpoints enforced in backend
- Input validation on forms
- HTTPS recommended for production

---

## 🚀 Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Serve the `dist` folder** using any static file server (Nginx, Apache, Netlify, Vercel, etc.)

3. **Configure environment variables** for production API URLs

4. **Enable HTTPS** for secure token transmission

---

## 📚 Additional Resources

- **API Specification**: See `README_API_ENDPOINTS.md` for detailed endpoint documentation
- **Backend Service**: See `BackendGruaService/README.md` for backend implementation
- **Postman Collection**: Available in backend folder for API testing

---

*Built with React, TypeScript, and Tailwind CSS for efficient towing dispatch management.*
