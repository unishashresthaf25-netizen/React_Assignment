import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recipe-finder-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id) {
    return favorites.some((r) => r.idMeal === id);
  }

  function toggleFavorite(recipe) {
    setFavorites((prev) =>
      prev.some((r) => r.idMeal === recipe.idMeal)
        ? prev.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prev, recipe]
    );
  }

  return { favorites, isFavorite, toggleFavorite };
}
