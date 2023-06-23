import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import style from "./Home.module.css";
import { getAllRecipes, getDiets } from "../../redux/action-creators/actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";

function Home({ isSearchPerformed }) {
  const recipeDataDiets = useSelector(state => state.diets)
  const recipeDataAll = useSelector(state => state.allRecipes)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(recipeDataDiets.length === 0) dispatch(getDiets())
  }, [recipeDataDiets, dispatch])

  useEffect(()=> {
    setLoading(true)
    if(!isSearchPerformed && recipeDataAll.length === 0) dispatch(getAllRecipes());
    if(recipeDataAll.length > 0) setLoading(false)
  
  }, [isSearchPerformed, recipeDataAll, dispatch])

  return (
    <div className={style.mainContainer}>
       {loading
      ? <Spinner />
      : <CardsContainer />
      }
      
    </div>
  );
}

export default Home;
