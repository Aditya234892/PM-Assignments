import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import SidePanel from "./SidePanel";

const FavoriteRecipes = () => {
    const [favorites, setFavorites] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
  
    useEffect(() => {
      const loadFavorites = () => {
        const storedFavorites = localStorage.getItem('favoriteRecipes');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      };
  
      loadFavorites();
      window.addEventListener('storage', loadFavorites);
      return () => window.removeEventListener('storage', loadFavorites);
    }, []);

    const removeFavorite = (recipe) => {
        const newFavorites = favorites.filter(fav => fav.uri !== recipe.uri);
        setFavorites(newFavorites);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    };

    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <Star className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-black">No Favorite Recipes Yet</h3>
                <p className="text-black mt-2">Start adding recipes to your favorites to see them here!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
            {favorites.map((recipe, index) => (
                <div 
                    key={index} 
                    className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-54 w-64"
                >
                    <button
                        onClick={() => removeFavorite(recipe)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-200 z-50"
                    >
                        <Star
                            className="fill-yellow-400 text-yellow-400 z-50"
                            size={20}
                        />
                    </button>

                    {recipe.image && (
                        <div className="relative h-36 w-full overflow-hidden">
                            <img
                                src={recipe.image}
                                alt={recipe.label}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-4">
                        <h3 className="font-semibold text-lg truncate">{recipe.label}</h3>
                    </div>

                    <div className="px-4 pb-2">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {recipe.healthLabels?.join(', ')}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Calories:</span> {Math.round(recipe.calories)} kcal
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Cook Time:</span> {recipe.totalTime} mins
                            </p>
                        </div>
                    </div>

                    <div className="p-4">
                        <button
                            onClick={() => setSelectedRecipe(recipe)}
                            className="inline-block px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 w-full"
                        >
                            Visit Recipe
                        </button>
                    </div>
                </div>
            ))}
            <SidePanel
                selectedRecipe={selectedRecipe}
                setSelectedRecipe={setSelectedRecipe}
            />
        </div>
    );
};

export default FavoriteRecipes;