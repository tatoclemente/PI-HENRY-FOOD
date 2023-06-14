import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom';
import { FiCheckSquare } from 'react-icons/fi'
import style from './Detail.module.css'

function Detail() {
  const [recipe, setRecipe ] = useState({});
  const {detailId} = useParams();

  useEffect(async () => {
    const {data} = await axios.get(`/recipes/${detailId}`)
    console.log(data);
    if(data.name) {
      setRecipe(data);
    }
  }, [detailId])
  console.log(recipe);

  return (
    <div className={style.detailContainer}>
      <p>{`ID: ${recipe?.id}`}</p>
      <h1>{recipe.name}</h1>
      <p>{recipe.summary}</p>
      <div>
        {recipe.steps?.map(step=>{
          return (
          <ul key={step}>
            <li>{step}</li>
          </ul>
          )
        })}
      </div>
      <p>{`Health Score: ${recipe.healthScore}`}</p>
      <img src={recipe.image} alt={recipe.name} />
      <ul>
        {
        recipe.diets?.map(diet => 
          <li key={diet}>
            <span>{<FiCheckSquare />}</span>
            {diet}
          </li>)
        }
      </ul>
    </div>
  )
}

export default Detail