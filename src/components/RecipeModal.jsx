import { useEffect, useState } from "react";
import { getMealById, extractIngredients } from "../services/mealDbService";

const RecipeModal = ({ mealId, initialMeal, onClose }) => {
  const [meal, setMeal] = useState(initialMeal || null);
  const [loading, setLoading] = useState(!initialMeal?.strInstructions);

  useEffect(() => {
    let isMounted = true;
    const loadFullRecipe = async () => {
      if (!mealId) return;
      if (initialMeal && initialMeal.strInstructions) {
        setMeal(initialMeal);
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await getMealById(mealId);
      if (isMounted) {
        setMeal(res.meal);
        setLoading(false);
      }
    };

    loadFullRecipe();
    return () => {
      isMounted = false;
    };
  }, [mealId, initialMeal]);

  if (!mealId) return null;

  const ingredients = extractIngredients(meal);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-orange-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-medium">Fetching recipe details...</p>
          </div>
        ) : meal ? (
          <div>
            {/* Hero Image & Title */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-2xl">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {meal.strCategory && (
                      <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                        {meal.strCategory}
                      </span>
                    )}
                    {meal.strArea && (
                      <span className="bg-orange-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                        {meal.strArea} Cuisine
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                    {meal.strMeal}
                  </h2>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              {/* Ingredients Section */}
              {ingredients.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🥗</span> Ingredients & Measurements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-orange-50/70 p-4 rounded-xl border border-orange-100">
                    {ingredients.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm py-1 px-2 rounded hover:bg-orange-100/50 transition"
                      >
                        <span className="text-gray-800 font-medium">• {item.ingredient}</span>
                        <span className="text-amber-700 font-semibold bg-white/80 px-2 py-0.5 rounded border border-orange-200">
                          {item.measure || "To taste"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions Section */}
              {meal.strInstructions && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>👨‍🍳</span> Step-by-Step Instructions
                  </h3>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 text-gray-700 leading-relaxed text-sm whitespace-pre-line space-y-2 font-normal">
                    {meal.strInstructions}
                  </div>
                </div>
              )}

              {/* Video and External Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  {meal.strYoutube && (
                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
                    >
                      <span>▶</span> Watch on YouTube
                    </a>
                  )}
                  {meal.strSource && (
                    <a
                      href={meal.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition"
                    >
                      <span>🔗</span> View Source
                    </a>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Failed to load recipe details.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
