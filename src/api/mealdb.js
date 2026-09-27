const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchByName(query, signal) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`, { signal });
  const data = await res.json();
  return data.meals || [];
}

export async function searchByIngredient(query, signal) {
  const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(query)}`, { signal });
  const data = await res.json();
  return data.meals || [];
}

export async function getRecipeDetails(id, signal) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`, { signal });
  const data = await res.json();
  if (!data.meals) throw new Error('Recipe not found');
  return data.meals[0];
}

// TheMealDB has no "featured" list, so the hero slider pulls a few random meals instead.
export async function getRandomMeals(count, signal) {
  const results = await Promise.allSettled(
    Array.from({ length: count }, () => fetch(`${BASE_URL}/random.php`, { signal }).then((r) => r.json()))
  );
  const meals = results
    .filter((r) => r.status === 'fulfilled' && r.value.meals)
    .map((r) => r.value.meals[0]);

  // random.php can return duplicates across calls; de-dupe by id.
  const seen = new Set();
  return meals.filter((meal) => {
    if (seen.has(meal.idMeal)) return false;
    seen.add(meal.idMeal);
    return true;
  });
}

// TheMealDB stores each ingredient/measure in separate numbered fields (strIngredient1..20).
export function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
    }
  }
  return ingredients;
}
