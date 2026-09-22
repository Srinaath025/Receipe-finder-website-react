const Services = () => {
  const servicesList = [
    {
      icon: "🔍",
      title: "Real-Time Recipe Search",
      desc: "Instantly lookup dishes by name, core ingredients, or cuisine origin powered by TheMealDB API.",
    },
    {
      icon: "🏷️",
      title: "Category & Dietary Filtering",
      desc: "Filter through categories including Chicken, Beef, Pasta, Seafood, Vegetarian, and Desserts with one click.",
    },
    {
      icon: "🎲",
      title: "Random Dish Inspiration",
      desc: "Can't decide what to eat? Tap the Random Recipe button to discover exciting unexpected meals.",
    },
    {
      icon: "⚖️",
      title: "Exact Ingredient Ratios",
      desc: "Clear tables displaying ingredients side-by-side with exact measurements to make prep flawless.",
    },
    {
      icon: "📺",
      title: "Video Cooking Guides",
      desc: "Direct links to step-by-step video tutorials on YouTube so you can follow along with expert chefs.",
    },
    {
      icon: "📱",
      title: "Mobile-First Accessibility",
      desc: "A responsive, accessible layout designed to stay open and easy to read right next to your stove.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-amber-600 font-semibold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Features & Capabilities
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-4">
          Everything You Need to Cook Confidently
        </h1>
        <p className="text-gray-600 text-lg">
          Explore the features built into Recipe Finder to make meal planning and home cooking seamless.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group hover:border-amber-200"
          >
            <div>
              <div className="text-4xl mb-4 p-3 bg-amber-50 rounded-2xl w-fit group-hover:scale-110 transition duration-200">
                {service.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center text-xs font-semibold text-amber-600">
              Free to use &middot; Powered by TheMealDB
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
