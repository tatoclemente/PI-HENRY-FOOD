import React, { useEffect } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import style from "./Home.module.css";
import { getAllRecipes } from "../../redux/action-creators/actions";
import { useDispatch } from "react-redux";

function Home({ recipes }) {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAllRecipes());
  }, [dispatch])

  return (
    <div className={style.mainContainer}>
      <CardsContainer recipes={recipes} />
    </div>
  );
}

export default Home;
