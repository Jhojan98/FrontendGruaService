import React from 'react';
import { FleetList } from './FleetList';
import { FleetTruckDetails } from './FleetTruckDetails';
import { FleetTruckForm } from './FleetTruckForm';
import { FleetManagementProps } from './types';

export const FleetManagement: React.FC<FleetManagementProps> = ({ currentView = 'fleet', onViewChange }) => {
  if (currentView === 'fleet/truck-details') {
    return <FleetTruckDetails onViewChange={onViewChange} />;
  }

  if (currentView === 'fleet/edit-truck') {
    return <FleetTruckForm isEditing onViewChange={onViewChange} />;
  }

  if (currentView === 'fleet/add-truck') {
    return <FleetTruckForm isEditing={false} onViewChange={onViewChange} />;
  }

  return <FleetList onViewChange={onViewChange} />;
};