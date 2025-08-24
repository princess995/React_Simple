import { useState, useEffect } from 'react';
import { useAppContext } from '../state/AppContext';

const useProfile = () => {
  const { state } = useAppContext();
  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!state.user) return;
    
    const userId = state.user.username;
    const savedProfile = localStorage.getItem(`userProfile_${userId}`);
    const savedProfiles = localStorage.getItem('allProfiles');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, [state.user]);

  const saveProfile = (profileData) => {
    if (!state.user) return;
    
    const userId = state.user.username;
    const newProfile = {
      id: Date.now(),
      userId: userId,
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProfile(newProfile);
    localStorage.setItem(`userProfile_${userId}`, JSON.stringify(newProfile));

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('allProfiles', JSON.stringify(updatedProfiles));
  };

  const updateProfile = (updatedData) => {
    if (!state.user || !profile) return;
    
    const userId = state.user.username;
    const updatedProfile = { 
      ...profile, 
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    setProfile(updatedProfile);
    localStorage.setItem(`userProfile_${userId}`, JSON.stringify(updatedProfile));

    const updatedProfiles = profiles.map(p => 
      p.id === profile.id ? updatedProfile : p
    );
    setProfiles(updatedProfiles);
    localStorage.setItem('allProfiles', JSON.stringify(updatedProfiles));
  };

  const deleteProfile = () => {
    if (!state.user || !profile) return;
    
    const userId = state.user.username;
    setProfile(null);
    localStorage.removeItem(`userProfile_${userId}`);
    
    const updatedProfiles = profiles.filter(p => p.id !== profile.id);
    setProfiles(updatedProfiles);
    localStorage.setItem('allProfiles', JSON.stringify(updatedProfiles));
  };

  return {
    profile,
    profiles,
    saveProfile,
    updateProfile,
    deleteProfile
  };
};

export default useProfile;