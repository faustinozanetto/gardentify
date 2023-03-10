import { useAuthContext } from '@modules/auth/context/auth-context';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React from 'react';

import PlantHeightRegistrationsManagement from './management/plant-height-registrations-management';

const PlantHeightRegistrationsHeader: React.FC = () => {
  const { user } = useAuthContext();
  const { plant } = useContainerPlantContext();
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      <h2 className="text-2xl font-bold">Height Registrations</h2>
      {/* Management */}
      {user && plant.container && plant.container.user && plant.container.user.uuid === user.uuid ? (
        <PlantHeightRegistrationsManagement />
      ) : null}
    </div>
  );
};

export default PlantHeightRegistrationsHeader;
