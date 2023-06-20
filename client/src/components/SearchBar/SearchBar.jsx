import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";

// Import Icon
import Glass from '../../images/searching.png';

import { RxMagnifyingGlass } from "react-icons/rx";
import style from "./SearchBar.module.css";
import { clearReacipeFiltered } from '../../redux/action-creators/actions';

function SearchBar({ onSearch }) {

  const globalStateRecipes = useSelector((state) => state.allRecipes);
  const dispatch = useDispatch()

  const [name, setName] = useState("");
  const [nameOptions, setNameOptions] = useState([]);

  useEffect(async () => {
    const nameData = globalStateRecipes.map((recipe) => recipe.name);
    
    const filteredNameData = nameData.filter((nameState) => nameState.toLowerCase().includes(name.toLowerCase()));

    const limitedOptions = filteredNameData.slice(0, 10);

    console.log(limitedOptions);
    if (limitedOptions.length > 0 && name.length > 0) {
      setNameOptions(limitedOptions);     
    } else {
      setNameOptions([])
    }
    return () => {
      // Limpiar el estado nameOptions cuando el componente se desmonta
      setNameOptions([]);
    };
    
  }, [name]);

  // console.log(nameOptions);

  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
    
  };

  const handleNameClick = () => {
      const query = name
      setName("")
      setNameOptions([])
      onSearch(query)
      dispatch(clearReacipeFiltered())
  }

  const handleSearchClick = (nameOption) => {
    if(nameOption) {
      setName("")
      setNameOptions([])
      onSearch(nameOption)
    }
  }

  return (
    <div className={style.searchBarContainer}>
      {/* <div className={style.label}>
        <label>COME ON!, SEARCH YOUR FAVORITE RECIPES</label>
      </div> */}
      <div className={style.searchBar}>
        <div className={style.inputContainer}>
          <input
            type="search"
            id="search"
            value={name}
            onChange={handleChange}
            placeholder="Start looking for..."
            className={style.input}
            autoComplete="off"
          />
          <span className={style.glass}><img className={style.glassImg} src={Glass} alt="glass" /></span>
        </div>
        <button
          className={style.button}
          onClick={() => handleNameClick()}
        >
          Search
        </button>
      </div>

      {nameOptions.length > 0 && (
        <div className={style.dropdown}>
          <ul className={style.dropdownMenu}>
            {nameOptions.map((option, index) => {
              return (
                <li
                  className={style.dropdownItem}
                  key={index}
                  onClick={() =>handleSearchClick(option)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
