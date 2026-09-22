import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const TIMEOUT_MS = 5000;

// High-quality fallback dataset matching TheMealDB format in case of network or upstream API downtime
const FALLBACK_CATEGORIES = [
  { idCategory: "1", strCategory: "Chicken", strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png" },
  { idCategory: "2", strCategory: "Beef", strCategoryThumb: "https://www.themealdb.com/images/category/beef.png" },
  { idCategory: "3", strCategory: "Pasta", strCategoryThumb: "https://www.themealdb.com/images/category/pasta.png" },
  { idCategory: "4", strCategory: "Seafood", strCategoryThumb: "https://www.themealdb.com/images/category/seafood.png" },
  { idCategory: "5", strCategory: "Vegetarian", strCategoryThumb: "https://www.themealdb.com/images/category/vegetarian.png" },
  { idCategory: "6", strCategory: "Dessert", strCategoryThumb: "https://www.themealdb.com/images/category/dessert.png" },
];

const FALLBACK_MEALS = [
  {
    idMeal: "52772",
    strMeal: "Teriyaki Chicken Casserole",
    strCategory: "Chicken",
    strArea: "Japanese",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
    strTags: "Meat,Casserole",
    strInstructions:
      "Preheat oven to 350° F. Spray a 9x13-inch baking dish with cooking spray.\nCombine soy sauce, water, brown sugar, ginger, and garlic in a small saucepan over medium heat.\nIn a small bowl, whisk cornstarch and cold water until dissolved, then stir into the sauce and simmer until thickened.\nPlace chicken breasts into prepared baking dish, pour half of the sauce over chicken, and bake for 30 minutes.\nServe over steamed rice garnished with sesame seeds and green onions.",
    strIngredient1: "Chicken Breasts", strMeasure1: "3/4 lb",
    strIngredient2: "Soy Sauce", strMeasure2: "1/2 cup",
    strIngredient3: "Brown Sugar", strMeasure3: "1/4 cup",
    strIngredient4: "Garlic", strMeasure4: "2 cloves minced",
    strIngredient5: "Ginger", strMeasure5: "1 tsp ground",
    strIngredient6: "Cornstarch", strMeasure6: "1 tbsp",
    strIngredient7: "Steamed Rice", strMeasure7: "2 cups",
  },
  {
    idMeal: "52770",
    strMeal: "Spaghetti Bolognese",
    strCategory: "Pasta",
    strArea: "Italian",
    strMealThumb: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
    strYoutube: "https://www.youtube.com/watch?v=-gC9rF6eS-4",
    strTags: "Pasta,Meat",
    strInstructions:
      "Heat olive oil in a large saucepan. Add onions and garlic and sauté until softened.\nAdd minced beef and cook until browned, breaking it up with a spoon.\nStir in tomato purée, chopped tomatoes, red wine (optional), oregano, and bay leaf.\nSimmer gently for at least 30-40 minutes stirring occasionally.\nCook spaghetti in salted boiling water according to package directions. Drain and serve with sauce and parmesan.",
    strIngredient1: "Minced Beef", strMeasure1: "500g",
    strIngredient2: "Olive Oil", strMeasure2: "1 tbsp",
    strIngredient3: "Onion", strMeasure3: "1 chopped",
    strIngredient4: "Garlic", strMeasure4: "2 cloves",
    strIngredient5: "Chopped Tomatoes", strMeasure5: "400g can",
    strIngredient6: "Spaghetti", strMeasure6: "400g",
    strIngredient7: "Parmesan", strMeasure7: "To serve",
  },
  {
    idMeal: "52959",
    strMeal: "Baked Salmon with Fennel & Tomatoes",
    strCategory: "Seafood",
    strArea: "British",
    strMealThumb: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    strYoutube: "https://www.youtube.com/watch?v=eYkQZpT0x5k",
    strTags: "Fish,Healthy",
    strInstructions:
      "Heat oven to 200C/180C fan/gas 6. Toss the fennel, cherry tomatoes, and capers with olive oil in a roasting tin.\nRoast for 15 mins until the fennel begins to soften.\nNestle the salmon fillets amongst the vegetables, season with salt and pepper, and top with lemon slices.\nBake for a further 12-15 mins until the salmon is cooked through and flaky.",
    strIngredient1: "Salmon", strMeasure1: "2 fillets",
    strIngredient2: "Fennel", strMeasure2: "1 bulb",
    strIngredient3: "Cherry Tomatoes", strMeasure3: "200g",
    strIngredient4: "Olive Oil", strMeasure4: "2 tbsp",
    strIngredient5: "Lemon", strMeasure5: "1 sliced",
  },
  {
    idMeal: "52855",
    strMeal: "Banana Pancakes",
    strCategory: "Dessert",
    strArea: "American",
    strMealThumb: "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
    strYoutube: "https://www.youtube.com/watch?v=kSKtb2Sv-_U",
    strTags: "Breakfast,Sweet",
    strInstructions:
      "In a bowl, mash the ripe bananas thoroughly with a fork.\nWhisk in the eggs, baking powder, and a pinch of cinnamon until well combined.\nHeat a non-stick frying pan over medium-low heat with a little butter or oil.\nPour batter in small circles and cook until bubbles form on top (2-3 mins), then flip and cook 1-2 mins more.\nServe warm drizzled with pure maple syrup and fresh berries.",
    strIngredient1: "Banana", strMeasure1: "2 ripe",
    strIngredient2: "Eggs", strMeasure2: "2 large",
    strIngredient3: "Baking Powder", strMeasure3: "1/2 tsp",
    strIngredient4: "Cinnamon", strMeasure4: "1/4 tsp",
    strIngredient5: "Maple Syrup", strMeasure5: "To drizzle",
  },
  {
    idMeal: "52804",
    strMeal: "Poutine",
    strCategory: "Vegetarian",
    strArea: "Canadian",
    strMealThumb: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
    strYoutube: "https://www.youtube.com/watch?v=UVAMAoA2_WU",
    strTags: "ComfortFood,Snack",
    strInstructions:
      "Heat oil in a deep-fryer or large heavy pot to 300°F (150°C). Fry cut potatoes for 5 minutes until soft but not browned.\nRemove and drain. Increase oil temperature to 375°F (190°C) and fry again for 2-3 minutes until golden and crisp.\nIn a saucepan, melt butter, add flour to make a roux, then whisk in beef or vegetable broth and simmer until thick.\nPlace hot fries in a bowl, scatter cheese curds over them, and ladle hot gravy generously on top.",
    strIngredient1: "Potatoes", strMeasure1: "1 kg",
    strIngredient2: "Cheese Curds", strMeasure2: "200g",
    strIngredient3: "Vegetable Broth", strMeasure3: "500ml",
    strIngredient4: "Butter", strMeasure4: "3 tbsp",
    strIngredient5: "Flour", strMeasure5: "3 tbsp",
  },
  {
    idMeal: "52874",
    strMeal: "Beef and Mustard Pie",
    strCategory: "Beef",
    strArea: "British",
    strMealThumb: "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    strYoutube: "https://www.youtube.com/watch?v=nMyBC999Uv8",
    strTags: "Pie,Meat",
    strInstructions:
      "Preheat the oven to 190C/375F/Gas 5. Brown the beef cubes in a hot frying pan with oil.\nAdd chopped onions, carrots, and celery. Stir in Dijon mustard, Worcestershire sauce, and beef stock.\nSimmer for 1.5 hours until the meat is melt-in-the-mouth tender.\nTransfer filling into a pie dish, cover with puff pastry, brush with egg wash, and bake for 30 minutes until golden.",
    strIngredient1: "Beef", strMeasure1: "750g",
    strIngredient2: "Dijon Mustard", strMeasure2: "2 tbsp",
    strIngredient3: "Puff Pastry", strMeasure3: "400g",
    strIngredient4: "Beef Stock", strMeasure4: "500ml",
    strIngredient5: "Onion", strMeasure5: "1 large",
  }
];

// Helper: Extract valid ingredients and measurements
export const extractIngredients = (meal) => {
  if (!meal) return [];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure && measure.trim() ? measure.trim() : "",
      });
    }
  }
  return ingredients;
};

// Axios instance with timeout
const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Search meals by name / keyword
 * Endpoint: /search.php?s={name}
 */
export const searchMeals = async (searchTerm = "") => {
  try {
    const response = await api.get(`/search.php?s=${encodeURIComponent(searchTerm.trim())}`);
    if (response.data && response.data.meals) {
      return { meals: response.data.meals, isLive: true };
    }
    // If search term returned no results
    if (response.data && response.data.meals === null) {
      return { meals: [], isLive: true };
    }
  } catch {
    console.warn("TheMealDB live API unavailable, using fallback dataset.");
  }

  // Fallback search
  const term = searchTerm.trim().toLowerCase();
  const filtered = FALLBACK_MEALS.filter(
    (m) =>
      m.strMeal.toLowerCase().includes(term) ||
      m.strCategory.toLowerCase().includes(term) ||
      m.strArea.toLowerCase().includes(term) ||
      (m.strTags && m.strTags.toLowerCase().includes(term))
  );

  return { meals: filtered, isLive: false };
};

/**
 * Fetch list of meal categories
 * Endpoint: /categories.php
 */
export const getCategories = async () => {
  try {
    const response = await api.get("/categories.php");
    if (response.data && response.data.categories) {
      return { categories: response.data.categories, isLive: true };
    }
  } catch {
    console.warn("TheMealDB categories endpoint unavailable, using fallback categories.");
  }
  return { categories: FALLBACK_CATEGORIES, isLive: false };
};

/**
 * Filter meals by category
 * Endpoint: /filter.php?c={category}
 */
export const getMealsByCategory = async (category) => {
  if (!category || category === "All") {
    return searchMeals("");
  }

  try {
    const response = await api.get(`/filter.php?c=${encodeURIComponent(category)}`);
    if (response.data && response.data.meals) {
      return { meals: response.data.meals, isLive: true };
    }
  } catch {
    console.warn(`TheMealDB category filter for "${category}" failed, using fallback.`);
  }

  // Fallback filtering
  const filtered = FALLBACK_MEALS.filter(
    (m) => m.strCategory.toLowerCase() === category.toLowerCase()
  );
  return { meals: filtered, isLive: false };
};

/**
 * Get detailed meal by ID
 * Endpoint: /lookup.php?i={id}
 */
export const getMealById = async (id) => {
  try {
    const response = await api.get(`/lookup.php?i=${encodeURIComponent(id)}`);
    if (response.data && response.data.meals && response.data.meals[0]) {
      return { meal: response.data.meals[0], isLive: true };
    }
  } catch {
    console.warn(`TheMealDB lookup for ID "${id}" failed, searching fallback.`);
  }

  const found = FALLBACK_MEALS.find((m) => m.idMeal === String(id));
  return { meal: found || FALLBACK_MEALS[0], isLive: false };
};

/**
 * Fetch a random meal
 * Endpoint: /random.php
 */
export const getRandomMeal = async () => {
  try {
    const response = await api.get("/random.php");
    if (response.data && response.data.meals && response.data.meals[0]) {
      return { meal: response.data.meals[0], isLive: true };
    }
  } catch {
    console.warn("TheMealDB random meal endpoint failed, using fallback.");
  }
  const randomIndex = Math.floor(Math.random() * FALLBACK_MEALS.length);
  return { meal: FALLBACK_MEALS[randomIndex], isLive: false };
};
