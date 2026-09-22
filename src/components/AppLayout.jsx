import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import RecipeModal from "./RecipeModal";
import { getRandomMeal } from "../services/mealDbService";

const AppLayout = () => {
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleRandomRecipe = async () => {
    const res = await getRandomMeal();
    if (res.meal) {
      setSelectedMeal(res.meal);
      setSelectedMealId(res.meal.idMeal);
    }
  };

  const handleCloseModal = () => {
    setSelectedMealId(null);
    setSelectedMeal(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800 antialiased selection:bg-amber-200">
      {/* Properly Placed Top Navigation Bar */}
      <Navbar onRandomRecipe={handleRandomRecipe} />

      {/* Main Routed Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Global Recipe Modal */}
      {selectedMealId && (
        <RecipeModal
          mealId={selectedMealId}
          initialMeal={selectedMeal}
          onClose={handleCloseModal}
        />
      )}

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
                <span>🍳</span> Recipe Finder
              </div>
              <p className="text-sm text-gray-400 max-w-sm">
                Explore thousands of gourmet meals, culinary inspiration, and authentic international dishes powered by TheMealDB API.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-amber-400 transition">Search Recipes</a></li>
                <li><a href="/about" className="hover:text-amber-400 transition">About Our Platform</a></li>
                <li><a href="/services" className="hover:text-amber-400 transition">Features & Services</a></li>
                <li><a href="/contact" className="hover:text-amber-400 transition">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                Data Source
              </h4>
              <p className="text-sm text-gray-400 mb-2">
                Recipes provided via{" "}
                <a
                  href="https://www.themealdb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  TheMealDB Open API
                </a>
              </p>
              <span className="inline-block bg-gray-800 text-amber-300 text-xs px-2.5 py-1 rounded border border-gray-700">
                JSON v1 API Live Feed
              </span>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Recipe Finder. All recipes and images belong to their respective owners.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
