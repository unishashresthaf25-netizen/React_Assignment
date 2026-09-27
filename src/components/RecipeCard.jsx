export default function RecipeCard({ recipe, favorite, onToggleFavorite, onViewDetails }) {
  const { strMeal, strMealThumb, strCategory, strArea } = recipe;
  const details = [strCategory, strArea].filter(Boolean).join(' · ');

  return (
    <div className="recipe-card">
      <button className="recipe-image" onClick={() => onViewDetails(recipe)}>
        <img src={strMealThumb} alt={strMeal} />
      </button>
      <div className="recipe-card-body">
        <h3 onClick={() => onViewDetails(recipe)}>{strMeal}</h3>
        {details && <p className="recipe-meta">{details}</p>}
        <button
          className={`fav-btn ${favorite ? 'saved' : ''}`}
          onClick={() => onToggleFavorite(recipe)}
        >
          {favorite ? '♥ Favorited' : '♡ Favorite'}
        </button>
      </div>
    </div>
  );
}
