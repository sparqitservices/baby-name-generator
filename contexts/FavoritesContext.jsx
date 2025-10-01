'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  const toggleFavorite = (name) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.name === name.name);
      if (exists) {
        return prev.filter(fav => fav.name !== name.name);
      }
      return [...prev, name];
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};