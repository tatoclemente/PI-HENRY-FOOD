import './App.css';
import { Home, Landing, Form, Detail } from './views'
import NavBar from './components/NavBar/NavBar';
import { Route, useLocation } from 'react-router-dom';
import { getDiets, getRecipesByName, clearRecicesSearch } from './redux/action-creators/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ROUTE from './helpers/routes.helpers';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



function App() {
  
  const recipesData = useSelector(state => state.recipesByName)
  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(() => {
    dispatch(getDiets())
  }, [])


  const onSearch = (name) => {
    if (!name) {
      window.alert("Ups, lo siento, debe ingresar un nombre de receta")
      return
  } 
    dispatch(clearRecicesSearch())
    dispatch(getRecipesByName(name))
  }

  const postRecipe = async (formData) => {

    console.log("--------------FRONT------------------");

    for (const entry of formData.entries()) {
      console.log(entry);
    }

    try {
      const {data} = await axios.post('http://localhost:3001/recipes', formData)
      console.log(data.message);
      if (data.message === "Recipe created successfully")
      window.alert("Felicitaciones, has creado una receta con exito")
      // history.push(ROUTE.HOME)
    } catch (error) {
      window.alert("Error al enviar el formulario")
      throw Error({error: error.message})
    }
  }

  const location = useLocation()
  return (
    <div className="App">

        {location.pathname !== '/'&& <NavBar 
          onSearch={onSearch}
        /> }
        
        
        <Route exact path={ROUTE.LANDING} render={ () => <Landing /> } />

        <Route path={ROUTE.HOME} render={ () => <Home 
        recipes={recipesData}/> } />

        <Route path={ROUTE.CREATE} render={ () => <Form 
        postRecipe={postRecipe}/> } />

        <Route path={`${ROUTE.DETAIL}/:detailId`} render={ () => <Detail /> } />

    </div>
  );
}

export default App;
