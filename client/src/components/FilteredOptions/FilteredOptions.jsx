import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearReacipeFiltered, filterByDiet, filterByOrigin, orderByName, orderByScore } from '../../redux/action-creators/actions'
import style from './FilteredOptions.module.css'

function FilteredOptions() {
  const diets = useSelector(state => state.diets)
  const dispatch = useDispatch()

  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedOrderByName, setSelectedOrderByName] = useState('');
  const [selectedOrderByHealth, setSelectedOrderByHealth] = useState('');

  const handleFilterByDiet = (event) => {
    dispatch(filterByDiet(event.target.value))
    setSelectedDiet(event.target.value);
  }

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value))
    setSelectedOrigin(event.target.value);
  }

  const handleClearClick = () => {
    dispatch(clearReacipeFiltered())
    setSelectedDiet('');
    setSelectedOrigin('');
    setSelectedOrderByName('');
    setSelectedOrderByHealth('');
  }
  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value))
    setSelectedOrderByName(event.target.value);
  
  }

  const handleOrderByScore = (event) => {
    dispatch(orderByScore(event.target.value))
    setSelectedOrderByHealth(event.target.value);
  }

  return (
    <div className={style.mainOptionsContainer}>
    <button onClick={handleClearClick}>All Recipes</button>
    <div className={style.optionsContainer}>
      <select name="filterByDiet" value={selectedDiet} onChange={handleFilterByDiet}>
        <option value="" disabled>Filter by Diet</option>
          {diets.map((diet, index) => (
            <option key={index} value={diet}>{diet}</option>
          ))}
      </select>
      <select name="filteredByOrigin" value={selectedOrigin} onChange={handleFilterByOrigin}>
        <option value="" disabled>FIlter by Origin</option>
        <option value="created">Created</option>
        <option value="api">API</option>
      </select>
      <select name="" value={selectedOrderByName} onChange={handleOrderByName}>
        <option value="" disabled>Order by Name</option>
        <option value="asc">A to Z</option>
        <option value="dsc">Z to A</option>
      </select>
      <select name="" value={selectedOrderByHealth} onChange={handleOrderByScore}>
        <option value="" disabled>Order by Health Score</option>
        <option value="more">Healthier</option>
        <option value="less">Less healthy</option>
      </select>
    </div>

  </div>
  )
}

export default FilteredOptions