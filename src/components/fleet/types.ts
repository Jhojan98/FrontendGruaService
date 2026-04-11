import { FleetTruck } from '../../types';

export type FleetManagementProps = {
  currentView?: string;
  onViewChange?: (view: string) => void;
  selectedTruckId?: string | null;
  onSelectTruck?: (truckId: string) => void;
  fleet?: FleetTruck[];
  refreshFleet?: () => Promise<void>;
};
