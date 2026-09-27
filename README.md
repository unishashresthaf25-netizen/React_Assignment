# Swad-Khoj — Recipe Finder

A simple React app for discovering recipes by name or ingredient using TheMealDB API,
viewing full ingredients and instructions, and saving favorites.

## Features

- Navbar with Home, Favorites, About Us, and Contact Us links, plus Login/Sign Up
- Search recipes by name or by ingredient (toggle between the two modes)
- Rotating hero banner of random recipes, plus a "Recommended" section on the home page
- Card grid of results with photo, title, category, and cuisine
- Click a recipe to view full details: ingredient list and step-by-step instructions
- Mark/unmark recipes as favorites, persisted with `localStorage`
- Loading, error, and "no results found" states handled gracefully
- Responsive layout (desktop and mobile)

## Technologies Used

- React 19 (functional components, hooks: `useState`, `useEffect`)
- Vite
- TheMealDB API (https://www.themealdb.com/api.php) — free, no API key required
- Plain CSS (no UI framework)

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

## Project Structure

```
src/
  api/
    mealdb.js             - TheMealDB search/details helpers
  components/
    SearchBar.jsx           - controlled search input + name/ingredient mode toggle
    RecipeGrid.jsx            - handles loading/error/empty states, renders list
    RecipeCard.jsx              - single recipe preview card with favorite toggle
    RecipeDetails.jsx             - modal that fetches full ingredients + instructions
  hooks/
    useFavorites.js                - localStorage-backed favorites list
  App.jsx                           - top-level state, search, tab navigation
```

## Screenshots

_Add 2–3 screenshots of the running app here before submitting, e.g.:_

```
![Search results](screenshots/search.png)
![Recipe details modal](screenshots/details.png)
![Favorites view](screenshots/favorites.png)
```

## Known Limitations

- Login/Sign Up is local-only for demonstration purposes — there is no backend or real
  account storage; refreshing the page logs you out.
- The Contact Us form does not actually send a message anywhere; it only shows a local
  confirmation.
- Ingredient search only returns basic info per result (image + name); full details load
  only once a recipe is opened.
- Search history is not saved between sessions — only favorites are persisted.
- No pagination — all results TheMealDB returns for a query are shown at once.
