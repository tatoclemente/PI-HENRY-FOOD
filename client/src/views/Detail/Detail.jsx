import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom';
import { FiCheckSquare } from 'react-icons/fi'
import style from './Detail.module.css'
import notAvailableImage from '../../images/not-available-image.jpg';

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

  const parseHTMLString = (htmlString) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText;
  }

  const htmlString = recipe.summary;

  const parsedSummary = parseHTMLString(htmlString);

  return (
    <div className={style.detailContainer}>
      <p>{`ID: ${recipe?.id}`}</p>
      <h1>{recipe.name}</h1>
      <p>{parsedSummary}</p>
      <div>
        {recipe.steps?.map((step, index)=>{
          return (
          <ul key={index}>
            <li>{step}</li>
          </ul>
          )
        })}
      </div>
      <p>{`Health Score: ${recipe.healthScore}`}</p>
      <img src={recipe.image} onError={(e) => e.target.src = notAvailableImage} alt={recipe.name} />
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