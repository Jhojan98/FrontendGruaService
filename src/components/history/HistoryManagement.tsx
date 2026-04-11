import React, { useCallback, useEffect, useState } from 'react';
import { listTrips } from '../../lib/api';
import { Trip } from '../../types';
import { HistoryManagementProps } from './types';
import { HistoryTripDetails } from './HistoryTripDetails';
import { HistoryTripList } from './HistoryTripList';

const SELECTED_HISTORY_TRIP_ID = 'selected_history_trip_id';

export const HistoryManagement: React.FC<HistoryManagementProps> = ({ currentView = 'history', onViewChange }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(() => sessionStorage.getItem(SELECTED_HISTORY_TRIP_ID));

  const refreshTrips = useCallback(async () => {
    try {
      const loaded = await listTrips();
      setTrips(loaded);
      if (!selectedTripId && loaded.length > 0) {
        const nextId = loaded[0].id;
        setSelectedTripId(nextId);
        sessionStorage.setItem(SELECTED_HISTORY_TRIP_ID, nextId);
      }
    } catch {
      setTrips([]);
    }
  }, [selectedTripId]);

  useEffect(() => {
    void refreshTrips();
  }, [refreshTrips]);

  const handleSelectTrip = (tripId: string) => {
    setSelectedTripId(tripId);
    sessionStorage.setItem(SELECTED_HISTORY_TRIP_ID, tripId);
  };

  if (currentView === 'history/trip-details') {
    return (
      <HistoryTripDetails
        onViewChange={onViewChange}
        selectedTripId={selectedTripId}
        trips={trips}
      />
    );
  }

  return (
    <HistoryTripList
      onViewChange={onViewChange}
      onSelectTrip={handleSelectTrip}
      selectedTripId={selectedTripId}
      trips={trips}
      refreshTrips={refreshTrips}
    />
  );
};
