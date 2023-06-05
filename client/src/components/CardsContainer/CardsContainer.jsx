import React from "react";
import Card from "../Cards/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";



function CardsContainer() {

  const recipes = useSelector((state) => state.recipes);
  
  return (
    <div className={style.cardsContainer}>
      {recipes.map((recipe, index) => (
        <Card
          key={index}
          id={recipe.id}
          name={recipe.title}
          image={recipe.image}
          sumary={recipe.sumary}
          healtScore={recipe.healtScore}
          steps={recipe.steps}
          diets={recipe.diets}
        />
      ))}
    </div>
  );
}

export default CardsContainer;
