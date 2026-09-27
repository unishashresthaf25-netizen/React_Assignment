import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import RecipeGrid from './components/RecipeGrid.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import AuthModal from './components/AuthModal.jsx';
import { useFavorites } from './hooks/useFavorites.js';
import { searchByName, searchByIngredient, getRandomMeals } from './api/mealdb.js';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'favorites' | 'about' | 'contact'
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('name');
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [heroSlides, setHeroSlides] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [recommendedStatus, setRecommendedStatus] = useState('loading');
  const [authMode, setAuthMode] = useState(null); // null | 'login' | 'signup'
  const [currentUser, setCurrentUser] = useState(null);

  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const controller = new AbortController();
    getRandomMeals(10, controller.signal)
      .then((meals) => {
        setHeroSlides(meals.slice(0, 4));
        setRecommended(meals.slice(4));
        setRecommendedStatus('success');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setRecommendedStatus('error');
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    setStatus('loading');

    const search = mode === 'name' ? searchByName : searchByIngredient;

    search(query, controller.signal)
      .then((results) => {
        setRecipes(results);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, [query, mode]);

  function handleSearch(text, searchMode) {
    setMode(searchMode);
    setQuery(text);
  }

  function handleAuthSubmit(user) {
    setCurrentUser(user);
    setAuthMode(null);
  }

  return (
    <>
      <Navbar
        view={view}
        onViewChange={setView}
        favoritesCount={favorites.length}
        currentUser={currentUser}
        onLoginClick={() => setAuthMode('login')}
        onSignupClick={() => setAuthMode('signup')}
        onLogout={() => setCurrentUser(null)}
      />

      {view === 'home' && (
        <>
          {!query && <HeroSlider slides={heroSlides} onViewDetails={setSelectedRecipe} />}
          <SearchBar onSearch={handleSearch} />

          {query ? (
            <RecipeGrid
              recipes={recipes}
              status={status}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onViewDetails={setSelectedRecipe}
              emptyMessage="No recipes found. Try a different search."
            />
          ) : (
            <>
              <h2 className="section-heading">Recommended</h2>
              <RecipeGrid
                recipes={recommended}
                status={recommendedStatus}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onViewDetails={setSelectedRecipe}
                emptyMessage="No recommendations available right now."
              />
            </>
          )}
        </>
      )}

      {view === 'favorites' && (
        <RecipeGrid
          recipes={favorites}
          status="success"
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onViewDetails={setSelectedRecipe}
          emptyMessage="You haven't favorited any recipes yet."
        />
      )}

      {view === 'about' && <AboutPage />}
      {view === 'contact' && <ContactPage />}

      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          favorite={isFavorite(selectedRecipe.idMeal)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSubmit={handleAuthSubmit}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
    </>
  );
}
