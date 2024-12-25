import React from "react";

const SidePanel = ({ selectedRecipe, setSelectedRecipe }) => {
  if (!selectedRecipe) return null;

  return (
  <div
    className={`fixed top-0 right-0 h-full w-[40rem] sm:w-[30rem] md:w-[35rem] bg-white shadow-2xl transform transition-all duration-300 ease-in-out overflow-y-auto ${
      selectedRecipe ? "translate-x-0" : "translate-x-full"
    }`}
  >
    {/* Close Button */}
    <button
      onClick={() => setSelectedRecipe(null)}
      className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    {/* Recipe Details */}
    <div className="p-6 sm:p-8 animate-fade-in mt-6">
      {/* Recipe Image */}
      <div className="relative h-48 sm:h-64 w-full mb-6">
        <img
          src={selectedRecipe.image}
          alt={selectedRecipe.label}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Recipe Title and Source */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
          {selectedRecipe.label}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">By {selectedRecipe.source}</p>
      </div>

      {/* Type Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {selectedRecipe.cuisineType?.map((cuisine) => (
          <span
            key={cuisine}
            className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm capitalize"
          >
            {cuisine} Cuisine
          </span>
        ))}
        {selectedRecipe.mealType?.map((meal) => (
          <span
            key={meal}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm capitalize"
          >
            {meal}
          </span>
        ))}
        {selectedRecipe.dishType?.map((dish) => (
          <span
            key={dish}
            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm capitalize"
          >
            {dish}
          </span>
        ))}
      </div>

      {/* Key Information */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">
            {Math.round(selectedRecipe.calories)}
          </p>
          <p className="text-sm text-gray-600">Calories</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">
            {selectedRecipe.totalTime || 0}
          </p>
          <p className="text-sm text-gray-600">Minutes</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">{selectedRecipe.yield}</p>
          <p className="text-sm text-gray-600">Servings</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">
            {Math.round(selectedRecipe.totalWeight)}g
          </p>
          <p className="text-sm text-gray-600">Total Weight</p>
        </div>
      </div>

      {/* CO2 Emissions */}
      {selectedRecipe.co2EmissionsClass && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Environmental Impact</h3>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              CO2 Emissions Class: {selectedRecipe.co2EmissionsClass.toUpperCase()}
            </p>
            <p className="text-xs text-green-600">
              Total CO2 Emissions: {Math.round(selectedRecipe.totalCO2Emissions)} g
            </p>
          </div>
        </div>
      )}

      {/* Health Labels */}
      {selectedRecipe.healthLabels?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Health Labels</h3>
          <div className="flex flex-wrap gap-2">
            {selectedRecipe.healthLabels.map((label) => (
              <span
                key={label}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cautions */}
      {selectedRecipe.cautions?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-amber-700">Cautions</h3>
          <div className="flex flex-wrap gap-2">
            {selectedRecipe.cautions.map((caution) => (
              <span
                key={caution}
                className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm"
              >
                ⚠️ {caution}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Diet Labels */}
      {selectedRecipe.dietLabels?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Diet</h3>
          <div className="flex flex-wrap gap-2">
            {selectedRecipe.dietLabels.map((label) => (
              <span
                key={label}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
        <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
          {selectedRecipe.ingredientLines.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nutrients */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Nutritional Information</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {selectedRecipe.digest?.map((nutrient, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">
                {nutrient.label}
              </p>
              <p className="text-lg">
                {Math.round(nutrient.total)}
                <span className="text-sm text-gray-500 ml-1">
                  {nutrient.unit}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-4 mt-8">
        <a
          href={selectedRecipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-3 bg-amber-500 text-white text-center rounded-lg hover:bg-amber-600 transition-colors text-lg font-semibold"
        >
          View Original Recipe
        </a>
        <a
          href={selectedRecipe.shareAs}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-3 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
        >
          Share Recipe
        </a>
      </div>
    </div>
  </div>
);

};

export default SidePanel;