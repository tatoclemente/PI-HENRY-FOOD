import React, { useState } from "react";
import Card from "../Cards/Card";
import style from "./CardsContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearRecicesSearch } from "../../redux/action-creators/actions";
import FilteredOptions from "../FilteredOptions/FilteredOptions";

function CardsContainer() {
  const allRecipes = useSelector((state) => state.allRecipes);
  const recipesByName = useSelector((state) => state.recipesByName);
  
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const hasFilteredRecipes = filteredRecipes.length > 0
  // console.log("RECETAS FILTRADAS",filteredRecipes);

  const dispatch = useDispatch()

  const [currentPage, setCurrentPage ] = useState(0)
  const perPage = 9

  const startIdx = currentPage * perPage
  const endIdx = startIdx + perPage

  const handleClick = () => {
    dispatch(clearRecicesSearch())
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 200);
    }
  }

  const getTotalPages = () => {
    let recipes = []
    if(hasFilteredRecipes){
      recipes = filteredRecipes
    } else if (recipesByName.length > 0) {
      recipes = recipesByName
    } else {
      recipes = allRecipes
    }
    
    return Math.ceil(recipes.length / perPage)
  
  }
    
  const totalPages = getTotalPages()

  return (
    <div className={style.mainContainer}>
      {recipesByName.length === 0 ? (
        <div className={style.viewContainer}>
          <h1 className={style.title}>Discover all our recipes</h1>

          <FilteredOptions 
          title='See All Recipes' 
          currentPage={currentPage} 
          totalPages={totalPages}
          handlePageChange={handlePageChange} />
          <div className={style.cardsContainer}>
            {hasFilteredRecipes ? 
              filteredRecipes.slice(startIdx, endIdx).map((recipe) => (
                <Card
                  key={recipe.id}
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  sumary={recipe.summary}
                  healtScore={recipe.healthScore}
                  steps={recipe.steps}
                  diets={recipe.diets}
                />
              )) :
              allRecipes.slice(startIdx, endIdx).map((recipe) => (
                <Card
                  key={recipe.id}
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  sumary={recipe.summary}
                  healtScore={recipe.healthScore}
                  steps={recipe.steps}
                  diets={recipe.diets}
                />
              ))
          }

          </div>
          <FilteredOptions 
          title='See All Recipes' 
          currentPage={currentPage} 
          totalPages={totalPages}
          handlePageChange={handlePageChange} />
        </div>
        ) :      
      (
        <div className={style.viewContainer}>
          <button onClick={handleClick} className={style.button}>🔙 Go back to see all the recipes again</button>
          <h1 className={style.title2}>here is your search</h1>
          <FilteredOptions 
          title='See All Searches'
          currentPage={currentPage} 
          totalPages={totalPages}
          handlePageChange={handlePageChange}/>
          <div className={style.cardsContainer}>
            {hasFilteredRecipes ? 
              filteredRecipes.slice(startIdx, endIdx).map((recipe) => (
                <Card
                  key={recipe.id}
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  sumary={recipe.summary}
                  healtScore={recipe.healthScore}
                  steps={recipe.steps}
                  diets={recipe.diets}
                />
              )) :
              recipesByName.slice(startIdx, endIdx).map((recipe) => (
                <Card
                  key={recipe.id}
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  sumary={recipe.summary}
                  healtScore={recipe.healthScore}
                  steps={recipe.steps}
                  diets={recipe.diets}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardsContainer;

