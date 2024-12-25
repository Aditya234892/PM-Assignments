import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";

const SearchResults = ({
  recipeData,
  toggleFavorite,
  isFavorited,
  setSelectedRecipe,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto h-[60vh] p-10 scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-amber-800 scrollbar-rounded-xl">
      {recipeData.map((item, index) => (
        <div key={index} className="w-full">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer relative">
            {/* Image Section */}
            <div className="relative">
              <img
                src={item.recipe.image}
                alt={item.recipe.label}
                className="w-full h-52 object-cover hover:scale-110 duration-200 cursor-pointer"
              />
              {/* Favorite Button */}
              <button
                onClick={(e) => toggleFavorite(item.recipe, e)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-200"
              >
                <FontAwesomeIcon
                  icon={isFavorited(item.recipe.uri) ? fasStar : farStar}
                  className={`text-xl ${
                    isFavorited(item.recipe.uri) ? "text-yellow-400" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
            {/* Details Section */}
            <div className="p-4 flex flex-col flex-grow justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 scale-90 text-center">
                {item.recipe.label}
              </h3>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRecipe(item.recipe);
                }}
                className="inline-block px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
              >
                Visit Recipe
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default SearchResults;
