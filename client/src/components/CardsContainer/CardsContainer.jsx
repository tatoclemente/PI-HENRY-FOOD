import React, { useState } from "react";
import Card from "../Cards/Card";
import style from "./CardsContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearRecicesSearch, filterByDiet, filterByOrigin } from "../../redux/action-creators/actions";
import FilteredOptions from "../FilteredOptions/FilteredOptions";

function CardsContainer() {
  const allRecipes = useSelector((state) => state.allRecipes);
  const recipesByName = useSelector((state) => state.recipesByName);
  
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const hasFilteredRecipes = filteredRecipes.length > 0


  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(clearRecicesSearch())
  }

  return (
    <div className={style.mainContainer}>
      {recipesByName.length === 0 ? (
        <div className={style.cardsContainer}>
          <h1 className={style.title}>Discover all our recipes</h1>

          <FilteredOptions />
          
          {hasFilteredRecipes ? 
            filteredRecipes.map((recipe) => (
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
            allRecipes.map((recipe) => (
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
        ) :      
      (
        <div className={style.cardsContainer}>
          <button onClick={handleClick}>Ver todas</button>
          <h1 className={style.title}>here is your search</h1>

          {recipesByName.map((recipe) => (
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
      )}
    </div>
  );
}

export default CardsContainer;

