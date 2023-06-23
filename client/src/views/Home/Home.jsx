import React, { useEffect } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import style from "./Home.module.css";
import { getAllRecipes, getDiets } from "../../redux/action-creators/actions";
import { useDispatch, useSelector } from "react-redux";

function Home({ isSearchPerformed }) {
  const recipeDataDiets = useSelector(state => state.diets)
  const recipeDataAll = useSelector(state => state.allRecipes)
  const dispatch = useDispatch();

  useEffect(() => {
    if(recipeDataDiets.length === 0) dispatch(getDiets())
  }, [recipeDataDiets, dispatch])

  useEffect(()=> {
    if(!isSearchPerformed && recipeDataAll.length === 0) dispatch(getAllRecipes());
  }, [isSearchPerformed, recipeDataAll, dispatch])

  return (
    <div className={style.mainContainer}>
      <CardsContainer />
    </div>
  );
}

export default Home;
