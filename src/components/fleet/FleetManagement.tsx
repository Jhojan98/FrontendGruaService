import React, { useCallback, useEffect, useState } from 'react';
import { listFleet } from '../../lib/api';
import { FleetTruck } from '../../types';
import { FleetList } from './FleetList';
import { FleetTruckDetails } from './FleetTruckDetails';
import { FleetTruckForm } from './FleetTruckForm';
import { FleetManagementProps } from './types';

const SELECTED_FLEET_TRUCK_ID = 'selected_fleet_truck_id';

export const FleetManagement: React.FC<FleetManagementProps> = ({ currentView = 'fleet', onViewChange }) => {
  const [fleet, setFleet] = useState<FleetTruck[]>([]);
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(() => sessionStorage.getItem(SELECTED_FLEET_TRUCK_ID));

  const refreshFleet = useCallback(async () => {
    try {
      const loaded = await listFleet();
      setFleet(loaded);
      if (loaded.length === 0) {
        setSelectedTruckId(null);
        sessionStorage.removeItem(SELECTED_FLEET_TRUCK_ID);
        return;
      }

      const hasSelected = selectedTruckId ? loaded.some((truck) => truck.id === selectedTruckId) : false;
      if (!hasSelected) {
        const nextId = loaded[0].id;
        setSelectedTruckId(nextId);
        sessionStorage.setItem(SELECTED_FLEET_TRUCK_ID, nextId);
      }
    } catch {
      setFleet([]);
    }
  }, [selectedTruckId]);

  useEffect(() => {
    void refreshFleet();
  }, [refreshFleet]);

  const handleSelectTruck = (truckId: string) => {
    setSelectedTruckId(truckId);
    sessionStorage.setItem(SELECTED_FLEET_TRUCK_ID, truckId);
  };

  if (currentView === 'fleet/truck-details') {
    return <FleetTruckDetails onViewChange={onViewChange} selectedTruckId={selectedTruckId} fleet={fleet} refreshFleet={refreshFleet} />;
  }

  if (currentView === 'fleet/edit-truck') {
    return (
      <FleetTruckForm
        isEditing
        onViewChange={onViewChange}
        selectedTruckId={selectedTruckId}
        fleet={fleet}
        refreshFleet={refreshFleet}
      />
    );
  }

  if (currentView === 'fleet/add-truck') {
    return <FleetTruckForm isEditing={false} onViewChange={onViewChange} refreshFleet={refreshFleet} />;
  }

  return (
    <FleetList
      onViewChange={onViewChange}
      onSelectTruck={handleSelectTruck}
      selectedTruckId={selectedTruckId}
      fleet={fleet}
    />
  );
};