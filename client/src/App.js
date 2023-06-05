import './App.css';
import { Home, Landing, Form, Detail } from './views'
import NavBar from './components/NavBar/NavBar';
import { Route, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation()
  return (
    <div className="App">

        {location.pathname !== '/'&& <NavBar />}
        
        <Route exact path="/" render={ () => <Landing /> } />

        <Route path="/home" render={ () => <Home /> } />

        <Route path="/create" render={ () => <Form /> } />

        <Route path="/detail" render={ () => <Detail /> } />

    </div>
  );
}

export default App;
