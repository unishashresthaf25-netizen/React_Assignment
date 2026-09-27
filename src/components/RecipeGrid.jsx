import RecipeCard from './RecipeCard.jsx';

export default function RecipeGrid({ recipes, status, isFavorite, onToggleFavorite, onViewDetails, emptyMessage }) {
  if (status === 'loading') {
    return <p className="status-message">Loading recipes...</p>;
  }

  if (status === 'error') {
    return <p className="status-message error">Something went wrong. Please try again.</p>;
  }

  if (recipes.length === 0) {
    return <p className="status-message">{emptyMessage}</p>;
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          favorite={isFavorite(recipe.idMeal)}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
