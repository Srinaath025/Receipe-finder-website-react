import { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-amber-600 font-semibold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Get in Touch
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">
          Contact Our Team
        </h1>
        <p className="text-gray-600">
          Have recipe suggestions, feedback, or need help finding a dish? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <p className="text-amber-100 text-sm mb-6 leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <span>support@recipefinder.app</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">📍</span>
                <span>Global Culinary Hub</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">🌐</span>
                <span>TheMealDB API Powered</span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-xs text-amber-200">
            Open 7 days a week for recipe inquiries
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center">
              <span className="text-4xl block mb-2">🎉</span>
              <h4 className="font-bold text-lg mb-1">Message Sent Successfully!</h4>
              <p className="text-sm text-emerald-700 mb-4">
                Thank you for reaching out. We will get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-900"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  placeholder="Recipe feedback or suggestion"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:shadow-md transition active:scale-[0.99]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
