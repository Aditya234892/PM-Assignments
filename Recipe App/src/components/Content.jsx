import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "animate.css";
import SidePanel from './SidePanel';
import SearchResults from "./Card";
import FavoriteRecipes from "./FavoriteRecipe";


const Content = () => {
    const [inputValue, setInputValue] = useState(() => localStorage.getItem('searchInput') || "");
    const [placeholder, setPlaceholder] = useState("");
    const [recipeData, setRecipeData] = useState(() => {
        const saved = localStorage.getItem('recipeData');
        return saved ? JSON.parse(saved) : [];
      });
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [favorites, setFavorites] = useState([]);
  const debounceTimeout = useRef(null);
  const placeholders = [
    "Search for recipes...",
    "Find your favorite cuisines...",
    "What are you cooking today?",
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const ApiKey = import.meta.env.VITE_API_KEY;
  const AppId = import.meta.env.VITE_APP_ID;

  useEffect(() => {
    if (inputValue) {
      fetchData(inputValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchInput', inputValue);
  }, [inputValue]);

  useEffect(() => {
    localStorage.setItem('recipeData', JSON.stringify(recipeData));
  }, [recipeData]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteRecipes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    const typingSpeed = 50;
    const deletingSpeed = 100;
    const pauseTime = 1500;

    const typeEffect = setTimeout(
      () => {
        if (!isDeleting && subIndex < placeholders[index].length) {
          setSubIndex(subIndex + 1);
        } else if (isDeleting && subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else if (!isDeleting && subIndex === placeholders[index].length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && subIndex === 0) {
          setIsDeleting(false);
          setIndex((index + 1) % placeholders.length);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(typeEffect);
  }, [subIndex, isDeleting, index, placeholders]);

  useEffect(() => {
    setPlaceholder(placeholders[index].slice(0, subIndex));
  }, [subIndex, placeholders, index]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchData(e.target.value);
    }, 2000);
  };

  const toggleFavorite = (recipe, event) => {
    event.stopPropagation();
    
    setFavorites(prevFavorites => {
      const isCurrentlyFavorited = prevFavorites.some(fav => fav.uri === recipe.uri);
      let newFavorites;
      
      if (isCurrentlyFavorited) {
        newFavorites = prevFavorites.filter(fav => fav.uri !== recipe.uri);
      } else {
        newFavorites = [...prevFavorites, recipe];
      }
      
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorited = (recipeUri) => {
    return favorites.some(fav => fav.uri === recipeUri);
  };

  const fetchData = async (query) => {
    if (query.trim() === "") return;
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${AppId}&app_key=${ApiKey}`
      );
      const recipes = response.data.hits;
      setRecipeData(recipes);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] py-6 flex justify-center items-center flex-col gap-y-4">
      {/* <FavoriteRecipes /> */}
      <div className={`w-full ${recipeData.length > 0 ? "scale-90" : "scale-100"}`}>
        <h1 className="text-3xl text-amber-200 animate__animated animate__fadeInDown text-center mb-4 px-4 sm:px-6 md:px-8">
          Welcome to the Recipe Finder, <br />
          Let's see what's gonna be on your plate today!
        </h1>
        <div className="w-full flex justify-center items-center flex-col">
          <input
            type="text"
            placeholder={placeholder}
            className="w-3/4 sm:w-3/5 md:w-1/2 h-12 rounded-lg bg-orange-200 text-gray-700 px-4 focus:ring-4 focus:ring-red-700 outline-none transition-shadow placeholder-black text-lg"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
  
      {/* Search Results */}
      <SearchResults
        recipeData={recipeData}
        toggleFavorite={toggleFavorite}
        isFavorited={isFavorited}
        setSelectedRecipe={setSelectedRecipe}
      />
  
      {/* SidePanel Component */}
      <SidePanel
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
      />
    </div>
  );
  
};

export default Content;