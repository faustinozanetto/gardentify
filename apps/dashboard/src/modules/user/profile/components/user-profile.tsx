import { User } from '@modules/graphql/@generated/graphql';
import React, { useEffect } from 'react';

import UserProfileEditProvider from '../context/edit/user-profile-edit-context';
import { useUserProfileContext } from '../context/user-profile-context';
import UserProfileContainers from './containers/user-profile-containers';
import UserProfileDetails from './details/user-profile-details';

type UserProfileProps = {
  user: User;
};

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user } = props;
  const { setUser } = useUserProfileContext();

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <UserProfileEditProvider>
      <div className="container mx-auto flex max-w-6xl flex-col space-y-4 px-2 md:px-4 lg:px-6">
        {/* Details */}
        <UserProfileDetails />
        {/* Containers */}
        <UserProfileContainers />
      </div>
    </UserProfileEditProvider>
  );
};

export default UserProfile;