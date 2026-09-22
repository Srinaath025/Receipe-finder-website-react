import { useState, useEffect, useCallback } from "react";
import {
  searchMeals,
  getCategories,
  getMealsByCategory,
} from "../services/mealDbService";
import RecipeModal from "../components/RecipeModal";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(true);
  const [activeModalMeal, setActiveModalMeal] = useState(null);

  // Load initial categories and meals on mount
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      setLoading(true);
      const [catsRes, mealsRes] = await Promise.all([
        getCategories(),
        searchMeals(""),
      ]);

      if (isMounted) {
        setCategories(catsRes.categories || []);
        setMeals(mealsRes.meals || []);
        setIsLiveApi(mealsRes.isLive);
        setLoading(false);
      }
    };

    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Search Submission
  const handleSearch = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      setLoading(true);
      setSelectedCategory("All");

      const res = await searchMeals(searchTerm);
      setMeals(res.meals || []);
      setIsLiveApi(res.isLive);
      setLoading(false);
    },
    [searchTerm]
  );

  // Handle Category Selection
  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchTerm("");
    setLoading(true);

    const res = await getMealsByCategory(categoryName);
    setMeals(res.meals || []);
    setIsLiveApi(res.isLive);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner & Search */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span>✨</span> Discover Over 1,000+ Verified Recipes
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
          What would you like to{" "}
          <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            cook today?
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Search hundreds of delicious recipes directly from TheMealDB open recipe catalog.
        </p>

        {/* Search Bar Input */}
        <form
          onSubmit={handleSearch}
          className="relative flex items-center max-w-xl mx-auto shadow-md rounded-2xl overflow-hidden border-2 border-orange-200 focus-within:border-amber-500 transition duration-200 bg-white"
        >
          <span className="pl-4 text-gray-400 text-xl">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by meal name (e.g. Chicken, Pasta, Cake)..."
            className="w-full py-3.5 px-3 text-gray-800 focus:outline-none text-base placeholder-gray-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                searchMeals("").then((res) => setMeals(res.meals || []));
              }}
              className="px-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-3.5 transition"
          >
            Search
          </button>
        </form>

        {/* Live API / Fallback Indicator */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              isLiveApi ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
            }`}
          ></span>
          <span className="text-gray-500">
            {isLiveApi
              ? "TheMealDB API Connected (Live)"
              : "Showing TheMealDB Recipes (Cached Fallback Mode)"}
          </span>
        </div>
      </div>

      {/* Categories Filter Pills */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Filter by Category
          </h3>
          {selectedCategory !== "All" && (
            <button
              onClick={() => handleCategoryClick("All")}
              className="text-xs text-amber-600 hover:underline font-medium"
            >
              Reset to All
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategoryClick("All")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition duration-150 ${
              selectedCategory === "All"
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
            }`}
          >
            🍽️ All Recipes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.idCategory || cat.strCategory}
              onClick={() => handleCategoryClick(cat.strCategory)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition duration-150 flex items-center gap-1.5 ${
                selectedCategory === cat.strCategory
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
              }`}
            >
              {cat.strCategoryThumb && (
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="w-4 h-4 object-contain rounded-full"
                />
              )}
              {cat.strCategory}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse flex flex-col space-y-3"
            >
              <div className="h-44 bg-gray-200 rounded-xl w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-150 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-full mt-auto"></div>
            </div>
          ))}
        </div>
      ) : meals && meals.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500">
              Found <span className="font-bold text-gray-800">{meals.length}</span>{" "}
              {meals.length === 1 ? "recipe" : "recipes"}
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col transform hover:-translate-y-1"
              >
                {/* Thumbnail Container */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  {meal.strCategory && (
                    <span className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {meal.strCategory}
                    </span>
                  )}
                  {meal.strArea && (
                    <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      🌍 {meal.strArea}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-amber-600 transition">
                      {meal.strMeal}
                    </h3>
                    {meal.strTags && (
                      <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                        🏷️ {meal.strTags.split(",").slice(0, 3).join(", ")}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalMeal(meal)}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition duration-150 shadow-sm"
                    >
                      <span>📖</span> View Recipe Details
                    </button>
                    {meal.strYoutube && (
                      <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white p-2.5 rounded-xl text-xs transition flex items-center justify-center"
                        title="Watch Video Recipe"
                      >
                        ▶
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-5xl mb-3 block">🍲</span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
            We couldn't find any meal matching "{searchTerm}". Try searching for another dish or browse a different category.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              handleCategoryClick("All");
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition"
          >
            Show All Recipes
          </button>
        </div>
      )}

      {/* Recipe Detail Modal */}
      {activeModalMeal && (
        <RecipeModal
          mealId={activeModalMeal.idMeal}
          initialMeal={activeModalMeal}
          onClose={() => setActiveModalMeal(null)}
        />
      )}
    </div>
  );
};

export default Home;
