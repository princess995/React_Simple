import { useState, useEffect } from 'react';
import { useAppContext } from '../state/AppContext';

const useFavorites = () => {
  const { state } = useAppContext();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (state.user) {
      const userId = state.user.username;
      const savedFavorites = localStorage.getItem(`favorites_${userId}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setFavorites([]);
    }
  }, [state.user]);

  const addToFavorites = (profileId) => {
    if (!state.user) return;
    
    const userId = state.user.username;
    const newFavorites = [...favorites, profileId];
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (profileId) => {
    if (!state.user) return;
    
    const userId = state.user.username;
    const newFavorites = favorites.filter(id => id !== profileId);
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
  };

  const toggleFavorite = (profileId) => {
    if (favorites.includes(profileId)) {
      removeFromFavorites(profileId);
    } else {
      addToFavorites(profileId);
    }
  };

  const isFavorite = (profileId) => {
    return favorites.includes(profileId);
  };

  const getFavoriteProfiles = () => {
    const allProfiles = JSON.parse(localStorage.getItem('allProfiles') || '[]');
    return allProfiles.filter(profile => favorites.includes(profile.id));
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteProfiles
  };
};

export default useFavorites;