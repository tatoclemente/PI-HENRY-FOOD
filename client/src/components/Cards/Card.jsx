import React from "react";
import style from "./Card.module.css";

import { FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import ROUTE from "../../helpers/routes.helpers";

function Card(props) {
  return (
    <div className={style.container}>
      <Link to={`${ROUTE.DETAIL}/${props.id}`} className={style.link}>
        <div className={style.pointer}></div>
      </Link>
      <div className={style.titleContainer}>
        <h3 className={style.name}>{props.name}</h3>
      </div>

      <div className={style.contentContainer}>
        <div className={style.imageContainer}>
          <img className={style.image} src={props.image} alt={props.name} />
        </div>
        <div className={style.dietsTypesContainer}>
          <h5 className={style.listTitle}>Types of Diets</h5>
          <ul className={style.listDiets}>
            {props.diets?.map((diet) => (
              <li key={diet} className={style.dietsTypes}>
                <span className={style.checkIcon}>{<FiCheckSquare />}</span>
                {diet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
