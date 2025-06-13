import React from "react";

function App() {
  // Define an array of dress styles with their names and placeholder image URLs.
  // The placeholder images are generated using placehold.co to mimic the original
  // layout's visual appearance and aspect ratios.
  const dressStyles = [
    {
      name: "Casual",
      imageUrl:
        "https://tse4.mm.bing.net/th?id=OIP.piGhIrQlZw6qQLCs022SdQHaJQ&pid=Api&P=0&h=180", // Placeholder for a casual outfit
    },
    {
      name: "Formal",
      imageUrl:
        "https://tse2.mm.bing.net/th?id=OIP.MNYh2nZO-NT3pNZW-FgsYwHaJQ&pid=Api&P=0&h=180", // Placeholder for a formal outfit
    },
    {
      name: "Party",
      imageUrl:
        "https://tse1.mm.bing.net/th?id=OIP._d3ZdDXXbrRwxeooVaolXQHaI5&pid=Api&P=0&h=180", // Placeholder for a party outfit
    },
    {
      name: "Gym",
      imageUrl:
        "https://tse1.mm.bing.net/th?id=OIP._d3ZdDXXbrRwxeooVaolXQHaI5&pid=Api&P=0&h=180", // Placeholder for gym wear
    },
  ];

  return (
    // Main container for the entire section.
    // Centered horizontally, with padding and a rounded background for the overall card effect.
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-gray-50 rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 max-w-6xl w-full">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-6 sm:mb-8 md:mb-10 font-inter tracking-wide">
          BROWSE BY DRESS STYLE
        </h2>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Map through the dressStyles array to render each card */}
          {dressStyles.map((style, index) => (
            
            <div
              key={index} // Unique key for list rendering
              className="relative w-full h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-md group cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
          
              <img
                src={style.imageUrl}
                alt={style.name}
                className="absolute inset-0 w-full h-full object-fit rounded-xl transition-opacity duration-300 group-hover:opacity-80"
                // Fallback for image loading errors
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop
                  e.target.src = `https://placehold.co/600x400/CCCCCC/666666?text=Image+Error`; // Generic fallback
                }}
              />
              {/* Overlay for the text.
                  - absolute inset-0: Positions the overlay over the entire card.
                  - bg-black bg-opacity-20: Semi-transparent black overlay for text readability.
                  - flex items-center justify-center: Centers the text.
                  - text-white text-2xl font-bold: Styling for the text.
                  - transition-opacity duration-300: Smooth transition for text.
                  - opacity-100 on hover: text always visible
              */}
              <div className="absolute inset-0 flex items-center justify-start p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl">
                <p className="text-white text-xl sm:text-2xl font-semibold font-inter leading-tight">
                  {style.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
