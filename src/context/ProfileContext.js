import { createContext, useContext } from 'react';

// Define a default value to avoid destructuring null
const defaultProfile = {
  profileImage: null,
  setProfileImage: () => {},
};

const ProfileContext = createContext(defaultProfile);

// New hook to use ProfileContext
export const useProfile = () => {
  return useContext(ProfileContext);
};

export default ProfileContext;