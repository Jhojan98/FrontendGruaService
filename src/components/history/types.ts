import { Trip } from '../../types';

export type HistoryManagementProps = {
  currentView?: string;
  onViewChange?: (view: string) => void;
  selectedTripId?: string | null;
  onSelectTrip?: (tripId: string) => void;
  trips?: Trip[];
  refreshTrips?: () => Promise<void>;
};
