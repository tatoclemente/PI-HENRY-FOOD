import './App.css';
import { Home, Landing, Form, Detail } from './views'
import NavBar from './components/NavBar/NavBar';
import { Route, useLocation } from 'react-router-dom';
import { getRecipesByName, clearRecicesSearch, addNewRecipe } from './redux/action-creators/actions';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import ROUTE from './helpers/routes.helpers';
import axios from 'axios';
import NotFound from './components/404NotFound/NotFound';


function App() {
  const dispatch = useDispatch()
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const onSearch = (name) => {
    if (!name) {
      window.alert("Ups, lo siento, debe ingresar un nombre de receta")
      return
  } 
    dispatch(clearRecicesSearch())
    dispatch(getRecipesByName(name))
    setIsSearchPerformed(true);
  }

  const postRecipe = async (formData) => {

    console.log("--------------FRONT------------------");
    setShowSpinner(true)
    for (const entry of formData.entries()) {
      console.log(entry);
    }

    try {
      const {data} = await axios.post('http://localhost:3001/recipes', formData)
      if (data.name)
      window.alert("Felicitaciones, has creado una receta con exito")
      dispatch(addNewRecipe(data))
      // history.push(ROUTE.HOME)
    } catch (error) {
      window.alert("Error al enviar el formulario")
      throw Error({error: error.message})
    } finally {
      setShowSpinner(false)
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
        isSearchPerformed={isSearchPerformed} /> } />

        <Route path={ROUTE.CREATE} render={ () => <Form 
        postRecipe={postRecipe}
        showSpinner={showSpinner} /> } />

        <Route path={`${ROUTE.DETAIL}/:detailId`} render={ () => <Detail /> } />

        <Route path={ROUTE.NOT_FOUND} render={ () => <NotFound />} />

    </div>
  );
}

export default App;
