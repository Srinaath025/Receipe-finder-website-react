const Aboutus = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-amber-600 font-semibold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Our Story & Mission
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-4">
          Bringing the World’s Kitchens to Your Table
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Recipe Finder is an open, community-oriented food platform created to inspire everyday home cooks, culinary students, and gourmet lovers with authentic recipes from across the globe.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-black text-amber-500 mb-1">1,000+</div>
          <div className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            Verified Recipes
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-black text-orange-500 mb-1">30+</div>
          <div className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            Global Cuisines
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-black text-amber-600 mb-1">100%</div>
          <div className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            Free & Open API
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-black text-red-500 mb-1">24/7</div>
          <div className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            Cooking Guidance
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Powered by TheMealDB Open Recipe Database
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Every recipe displayed on our platform is sourced directly through TheMealDB's open-source JSON API. We deliver accurate ingredient measurements, detailed culinary instructions, and video walkthroughs for hassle-free meal prep.
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span> Precise measurements for each ingredient
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span> Integrated YouTube video tutorials
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span> Filter by dietary style, cuisine origin, or ingredients
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-3xl border border-orange-200 shadow-sm flex flex-col justify-center">
          <div className="text-4xl mb-3">🍲</div>
          <h3 className="text-xl font-bold text-amber-900 mb-2">Our Culinary Philosophy</h3>
          <p className="text-amber-800/90 text-sm leading-relaxed">
            Good food brings people together. We believe cooking should be simple, joyful, and accessible to anyone regardless of culinary experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
