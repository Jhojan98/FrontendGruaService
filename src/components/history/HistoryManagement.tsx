import React from 'react';
import { HistoryManagementProps } from './types';
import { HistoryTripDetails } from './HistoryTripDetails';
import { HistoryTripList } from './HistoryTripList';

export const HistoryManagement: React.FC<HistoryManagementProps> = ({ currentView = 'history', onViewChange }) => {
  if (currentView === 'history/trip-details') {
    return <HistoryTripDetails onViewChange={onViewChange} />;
  }

  return <HistoryTripList onViewChange={onViewChange} />;
};
