import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AppLayout from "./components/AppLayout";
import { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <AppLayout />
          <div className="p-4 ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Particulars  ▼
            </button>

            {isOpen && (
              <div className="absolute mt-2 bg-blue-200 text-black px-4 py-2 rounded shadow-md z-10 min-w-[180px]">
                <ul className="space-y-2 text-lg font-medium">
                  <li><a href="/" className="hover:text-orange-500 block">Home</a></li>
                  <li><a href="/about" className="hover:text-orange-500 block">About</a></li>
                  <li><a href="/services" className="hover:text-orange-500 block">Services</a></li>
                  <li><a href="/contact" className="hover:text-orange-500 block">Contact</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: '/about', element: <Aboutus /> },
        { path: '/services', element: <Services /> },
        { path: '/contact', element: <Contact /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
