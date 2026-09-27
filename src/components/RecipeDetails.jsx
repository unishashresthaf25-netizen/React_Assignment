import { useState, useEffect } from 'react';
import { getRecipeDetails, extractIngredients } from '../api/mealdb.js';

export default function RecipeDetails({ recipe, favorite, onToggleFavorite, onClose }) {
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    getRecipeDetails(recipe.idMeal, controller.signal)
      .then((data) => {
        setDetails(data);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, [recipe.idMeal]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {status === 'loading' && <p className="status-message">Loading recipe...</p>}
        {status === 'error' && <p className="status-message error">Couldn't load this recipe.</p>}

        {status === 'success' && (
          <div className="modal-content">
            <img src={details.strMealThumb} alt={details.strMeal} className="modal-image" />
            <div className="modal-info">
              <h2>{details.strMeal}</h2>
              <p className="recipe-meta">
                {[details.strCategory, details.strArea].filter(Boolean).join(' · ')}
              </p>

              <h3 className="modal-subheading">Ingredients</h3>
              <ul className="ingredient-list">
                {extractIngredients(details).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3 className="modal-subheading">Instructions</h3>
              <p className="recipe-instructions">{details.strInstructions}</p>

              <button
                className={`fav-btn ${favorite ? 'saved' : ''}`}
                onClick={() => onToggleFavorite(recipe)}
              >
                {favorite ? '♥ Remove Favorite' : '♡ Add to Favorites'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
