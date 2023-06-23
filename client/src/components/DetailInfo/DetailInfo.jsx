import React from 'react'
import CheckOk from '../../images/check-mark.png';
import style from './DetailInfo.module.css'
import notAvailableImage from '../../images/not-available-image.jpg';

function DetailInfo({recipe}) {

  const parseHTMLString = (htmlString) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlString;
  return tempElement.textContent || tempElement.innerText;
  }

  const htmlString = recipe.summary;

  const parsedSummary = parseHTMLString(htmlString);


  return (
    <div className={style.detailContainer}>
      <p className={style.id}>{`ID: ${recipe?.id}`}</p>
      <h1 className={style.name}>{recipe.name}</h1>
      <p className={style.summary}>{parsedSummary}</p>
      <div className={style.imageContainer}>
        <img 
          src={recipe?.image} 
          onError={(e) => e.target.src = notAvailableImage} 
          alt={recipe.name} 
          className={style.image} />
        <div className={style.dietsContainer}>
        <p className={style.healthScore}>Health Score: <span className={style.score}>{recipe.healthScore}</span></p>
          <h4 className={style.dietsTitle}>Diet Types</h4>
          <ul>
            {recipe.diets?.length ===0? <p className={style.textNoDiets}>There are no diets assigned to this recipe</p>:
            recipe.diets?.map(diet => 
              <li key={diet} className={style.dietsList}>
                <img src={CheckOk} alt="ckeck-icon" className={style.checkIcon} />
                {diet}
              </li>)
            }
          </ul>
        </div>
      </div>
      <div className={style.stepsContainer}>
        <h4 className={style.stepsTitle}>Step by Step</h4>
        {recipe.steps?.map((step, index)=>{
          return (
          <ul key={index} className={style.stepsList}>
            <li className={index % 2 === 0? style.stepBg: style.step}>{`${index + 1}- ${step}`}</li>
          </ul>
          )
        })}
      </div>
    </div>
  )
}

export default DetailInfo