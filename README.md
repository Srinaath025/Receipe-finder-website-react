# 🍳 Recipe Finder — Delicious Recipes at Your Fingertips

A modern, fast, and responsive web application built with **React**, **Vite**, and **Tailwind CSS**, connected directly to **TheMealDB Open API**. Whether you are deciding what to cook for dinner, exploring international cuisines, or looking for step-by-step cooking videos, Recipe Finder makes discovering meals simple and fun.

---

## 📖 Table of Contents

1. [What is Recipe Finder? (In Layman's Terms)](#-what-is-recipe-finder-in-laymans-terms)
2. [Key Features](#-key-features)
3. [Live Demo & Screenshots](#-live-demo--preview)
4. [How It Works Under the Hood](#-how-it-works-under-the-hood)
5. [Tech Stack & Tools (With Simple Explanations)](#-tech-stack--tools)
6. [Skills & Concepts Demonstrated](#-skills--concepts-demonstrated)
7. [Project Structure & File Guide](#-project-structure--file-guide)
8. [TheMealDB API Integration Guide](#-themealdb-api-integration-guide)
9. [Getting Started (Installation & How to Run)](#-getting-started)
10. [Troubleshooting (Windows PowerShell Fixes)](#-troubleshooting)
11. [Future Roadmap](#-future-roadmap)
12. [License & Acknowledgements](#-license--acknowledgements)

---

## 🌟 What is Recipe Finder? (In Layman's Terms)

Imagine walking into a massive library containing thousands of cooking books from every corner of the world — Italy, Japan, Mexico, India, and beyond. Instead of flipping through heavy pages, you simply type what you have in your fridge (like *"chicken"* or *"pasta"*) or click a category button, and the app instantly presents delicious dishes matching your request.

When you choose a meal, a clean window pops up giving you:
- **A high-definition photo** of what the finished dish looks like.
- **The exact grocery list** with clear quantities (e.g., *2 tablespoons of olive oil*, *500g beef*).
- **Clear step-by-step instructions** so you never get confused while cooking.
- **A direct YouTube video link** so you can watch a real chef cook the dish before you start!

If you're ever in a dilemma asking *"What should I eat today?"*, you can click the **🎲 Random Recipe** button, and the app will surprise you with an exciting new culinary idea.

---

## ✨ Key Features

- **🔍 Live Recipe Search**: Search hundreds of meals in real time by name, keyword, or dish type.
- **🏷️ Category Filtering**: Filter recipes across categories such as *Chicken*, *Beef*, *Pasta*, *Seafood*, *Vegetarian*, and *Dessert*.
- **🎲 "Surprise Me" (Random Recipe)**: Instantly fetches a random meal from the international database with one click.
- **📖 Comprehensive Recipe Modal**:
  - Meal hero picture, cuisine origin (e.g. *Japanese*, *Italian*), and category tags.
  - Formatted 2-column table displaying ingredients matched with their exact measurements.
  - Full preparation instructions.
  - Quick action buttons to open the official YouTube video tutorial or original recipe source.
- **🛡️ Resilient Offline / Fallback Shield**: If TheMealDB's public servers experience downtime or connection timeouts (like Cloudflare 522 errors), the app automatically falls back to an offline cache so users never see broken screens or errors.
- **📱 Fully Responsive Design**: Seamless layout that looks great on mobile phones, tablets, and desktop widescreen displays.
- **🧭 Client-Side Multi-Page Routing**: Navigate smoothly between Home, About Us, Services, and Contact pages without sluggish page reloads.

---

## 🏗️ How It Works Under the Hood

Here is how data flows from your screen to the internet and back:

```
[User Types / Clicks]
        │
        ▼
[React UI (Home / Navbar / Modal)]
        │
        ▼ Calls function
[mealDbService.js (API Layer)]
        │
        ▼ Sends HTTP GET request via Axios
[TheMealDB Public API Servers]
        │
   ┌────┴───────────────────────────┐
   │ Success                        │ Network / Server Error
   ▼                                ▼
[Parses Live JSON Data]       [Loads Resilient Fallback Cache]
   │                                │
   └────┬───────────────────────────┘
        ▼
[React State Updated (`setMeals`)]
        │
        ▼ Re-renders component
[Beautiful Recipe Cards Displayed on Screen]
```

---

## 🛠️ Tech Stack & Tools

| Technology | What It Is (Layman's Terms) | Why We Used It |
| :--- | :--- | :--- |
| **[React 19](https://react.dev/)** | A popular tool created by Meta for building dynamic user interfaces. | It allows us to build reusable building blocks (components) that update instantly on the screen without reloading the page. |
| **[Vite 6](https://vite.dev/)** | An ultra-fast development server and build tool. | Starts up in less than 1 second and provides instant Hot Module Replacement (HMR) whenever you edit code. |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | A modern utility-first styling system. | Lets us write beautiful, clean, responsive styles directly in our code without massive, messy separate CSS files. |
| **[React Router v7](https://reactrouter.com/)** | A navigation library for React apps. | Allows the website to have multiple pages (`/`, `/about`, `/services`, `/contact`) while keeping the fast single-page app experience. |
| **[Axios](https://axios-http.com/)** | An HTTP client for fetching data from the web. | Sends web requests to TheMealDB API, handles timeouts, and automatically converts incoming data into JavaScript objects. |
| **[TheMealDB API](https://www.themealdb.com/api.php)** | An open-source database of food recipes from around the globe. | Supplies verified meal names, categories, photos, ingredient lists, and YouTube tutorials. |

---

## 🧠 Skills & Concepts Demonstrated

This project showcases fundamental and advanced modern frontend development skills suitable for portfolio reviews, resumes, and technical interviews:

### 1. Component-Based Architecture
- Breaking down a complex web application into modular, single-responsibility components (`Navbar`, `RecipeModal`, `AppLayout`, `Home`).
- Reusing components to keep code DRY (*Don't Repeat Yourself*).

### 2. Modern React Hooks
- **`useState`**: Managing dynamic data (search queries, active categories, modal open/close states, API status).
- **`useEffect`**: Handling lifecycle events and asynchronous side effects (fetching initial recipes on page load).
- **`useCallback`**: Memoizing callback functions to prevent unnecessary component re-renders.

### 3. Asynchronous API Integration & Data Transformation
- Sending HTTP requests using `async/await` syntax.
- **Handling API Quirks**: TheMealDB returns ingredients in 20 separate numbered fields (`strIngredient1` to `strIngredient20` and `strMeasure1` to `strMeasure20`). We wrote a custom parser (`extractIngredients`) that dynamically merges them into a clean array of objects for display.

### 4. Resilient Error Handling & Graceful Degradation
- Real-world production apps cannot simply crash when a 3rd-party API goes down. We implemented a fallback cache mechanism that automatically catches network failures or server timeouts (e.g. 522 Cloudflare errors) and serves fallback dishes with an informative UI indicator.

### 5. Client-Side Routing & Layout Patterns
- Configuring nested routing using React Router's `createBrowserRouter`, `<RouterProvider />`, and `<Outlet />`.
- Persistent navigation headers and footers that do not re-render when switching pages.
- Active navigation link indicators using `NavLink`.

### 6. Responsive UI & Modern Design Aesthetics
- Mobile-first responsive grids (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
- Modern visual elements: subtle backdrop blurs (`backdrop-blur-md`), warm food-themed color palettes, glassmorphism badges, and smooth micro-interactions.

---

## 📁 Project Structure & File Guide

```
d:/Projects/cook/
├── public/                 # Static assets (favicons, icons)
│   └── vite.svg
├── src/
│   ├── components/         # Reusable UI building blocks
│   │   ├── AppLayout.jsx   # Master layout: Top Navbar, Outlet (page content), and Footer
│   │   ├── Navbar.jsx      # Sticky top header, navigation links, random recipe trigger & mobile menu
│   │   └── RecipeModal.jsx # Popup dialog showing ingredients, instructions, and video links
│   ├── pages/              # Routed pages
│   │   ├── Home.jsx        # Main recipe finder with search bar, category filters, and recipe cards
│   │   ├── Aboutus.jsx     # Platform background, mission, and culinary statistics
│   │   ├── Services.jsx    # Feature showcase detailing what the platform offers
│   │   └── Contact.jsx     # Interactive contact form and support information
│   ├── services/
│   │   └── mealDbService.js# API layer: Axios configuration, TheMealDB endpoints, and fallback data
│   ├── App.jsx             # React Router configuration
│   ├── index.css           # Global Tailwind CSS imports and custom animation keyframes
│   └── main.jsx            # Application entry point rendering React into the DOM
├── index.html              # Root HTML template
├── package.json            # Project dependencies and script commands
├── vite.config.js          # Vite configuration with React SWC and Tailwind plugins
└── README.md               # Project documentation
```

### File-by-File Breakdown:

- **[src/services/mealDbService.js](file:///d:/Projects/cook/src/services/mealDbService.js)**:
  The "brain" that communicates with the outside world. Contains functions to search meals, load categories, fetch recipes by ID, and handle fallback data if the API is offline.
- **[src/components/Navbar.jsx](file:///d:/Projects/cook/src/components/Navbar.jsx)**:
  The top navigation bar. Includes the brand logo, navigation links with active highlights, a quick "Random Recipe" button, and a mobile hamburger menu.
- **[src/components/AppLayout.jsx](file:///d:/Projects/cook/src/components/AppLayout.jsx)**:
  The parent wrapper. Ensures that every page shares the same top navbar and footer, and hosts the global recipe modal.
- **[src/components/RecipeModal.jsx](file:///d:/Projects/cook/src/components/RecipeModal.jsx)**:
  The popup window showing the recipe details, ingredients table, instructions, and video tutorial.
- **[src/pages/Home.jsx](file:///d:/Projects/cook/src/pages/Home.jsx)**:
  The homepage where users search for meals, filter by categories, and view recipe cards.

---

## 🌐 TheMealDB API Integration Guide

This app connects to **TheMealDB API**, an open database of recipes.

### Free Base URL
```
https://www.themealdb.com/api/json/v1/1/
```
*(The `1` in the URL is TheMealDB's free public developer test key).*

### Endpoints Used:

1. **Search Meals by Keyword**:
   - `GET /search.php?s={query}`
   - *Example*: `/search.php?s=Arrabiata`
   - *Returns*: Array of meal objects matching the name.

2. **List All Categories**:
   - `GET /categories.php`
   - *Returns*: Array of food categories with names and thumbnails (*Chicken*, *Beef*, *Pasta*, etc.).

3. **Filter Meals by Category**:
   - `GET /filter.php?c={category}`
   - *Example*: `/filter.php?c=Seafood`
   - *Returns*: List of meals belonging to that category.

4. **Lookup Full Recipe by ID**:
   - `GET /lookup.php?i={idMeal}`
   - *Example*: `/lookup.php?i=52772`
   - *Returns*: Complete details including instructions, YouTube link, and ingredients.

5. **Get Random Meal**:
   - `GET /random.php`
   - *Returns*: A single randomly selected meal.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed:
```powershell
node -v
npm -v
```

### Step 1: Navigate to the Project Folder
```powershell
cd d:\Projects\cook
```

### Step 2: Install Dependencies
```powershell
npm install
```
*(Or `npm.cmd install` on Windows PowerShell).*

### Step 3: Start the Development Server
```powershell
npm run dev
```

### Step 4: Open in Your Browser
Once Vite starts, open your browser and navigate to:
```
http://localhost:5173/
```

---

## 🛠️ Troubleshooting

### Issue: Windows PowerShell Script Execution Error
If you see this error when running `npm`:
> `npm : File ... npm.ps1 cannot be loaded because running scripts is disabled on this system.`

This happens because Windows PowerShell blocks `.ps1` script execution by default.

#### Solution 1 (Recommended): Run `npm.cmd`
You can run any npm command by adding `.cmd`:
```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

#### Solution 2: Enable Script Execution for Your User Account
Run this one command in PowerShell:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
After running that once, standard `npm run dev` will work normally.

---

## 📋 Available NPM Scripts

In the project directory, you can run:

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the local development server with instant Hot Module Replacement. |
| `npm run build` | Compiles and optimizes the app for production into the `dist/` folder. |
| `npm run preview` | Locally serves the production build to preview performance before deploying. |
| `npm run lint` | Runs ESLint to check for code syntax issues and best practices. |

---

## 🗺️ Future Roadmap

Ideas for future enhancements:
- [ ] **Bookmarks & Favorites**: Save favorite recipes to browser `localStorage` for offline access.
- [ ] **Shopping List Generator**: Check off ingredients to automatically generate an exportable grocery list.
- [ ] **Calorie & Nutrition Calculator**: Estimate total calories and macronutrients per serving.
- [ ] **Dark Mode**: Add a theme switcher for late-night cooking in dim kitchens.
- [ ] **Custom Recipe Submission**: Allow users to type and save their own secret family recipes.

---

## 📄 License & Acknowledgements

- **Recipe Data & Images**: Sourced from [TheMealDB](https://www.themealdb.com/) under their free public API.
- **Project Template**: Initialized with [Vite](https://vite.dev/) and [React](https://react.dev/).
- **Design & Icons**: Styled with [Tailwind CSS](https://tailwindcss.com/) and Unicode food iconography.

---

*Bon Appétit & Happy Cooking! 🍳*
