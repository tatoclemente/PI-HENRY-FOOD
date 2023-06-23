import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearReacipeFiltered,
  filterByDiet,
  filterByOrigin,
  orderByName,
  orderByScore,
} from "../../redux/action-creators/actions";
import style from "./FilteredOptions.module.css";

function FilteredOptions({ title, currentPage, totalPages, handlePageChange }) {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  const [filterOptions, setFilterOptions] = useState({
    selectedDiet: "",
    selectedOrigin: "",
    selectedOrderByName: "",
    selectedOrderByHealth: ""
  });

  const handleFilterByDiet = (event) => {
    dispatch(filterByDiet(event.target.value));
    setFilterOptions((prevState) => ({
      ...prevState,
      selectedDiet: event.target.value
    }));
    handleFilterChange()
    window.scrollTo(0, 0);
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
    setFilterOptions((prevState) => ({
      ...prevState,
      selectedOrigin: event.target.value
    }));
    handleFilterChange()
    window.scrollTo(0, 0);
  };

  const handleClearClick = () => {
    dispatch(clearReacipeFiltered());
    setFilterOptions({
      selectedDiet: "",
      selectedOrigin: "",
      selectedOrderByName: "",
      selectedOrderByHealth: ""
    })
    handleFilterChange()
    window.scrollTo(0, 0);
  };
  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value));
    setFilterOptions((prevState) => ({
      ...prevState,
      selectedOrderByName: event.target.value
    }));
    handleFilterChange()
    window.scrollTo(0, 0);
  };

  const handleOrderByScore = (event) => {
    dispatch(orderByScore(event.target.value));
    setFilterOptions((prevState) => ({
      ...prevState,
      selectedOrderByHealth: event.target.value
    }));
    handleFilterChange()
    window.scrollTo(0, 0);
  };

  const handleFilterChange = () => {
    handlePageChange(0); // Establecer currentPage en 0
  };
  return (
    <div className={style.mainOptionsContainer}>
      <button onClick={handleClearClick}>{title}</button>
      <div className={style.optionsContainer}>
        <select
          name="filterByDiet"
          value={filterOptions.selectedDiet}
          onChange={handleFilterByDiet}
        >
          <option value="" disabled>
            Filter by Diet
          </option>
          {diets.map((diet, index) => (
            <option key={index} value={diet}>
              {diet}
            </option>
          ))}
        </select>
        <select
          name="filteredByOrigin"
          value={filterOptions.selectedOrigin}
          onChange={handleFilterByOrigin}
        >
          <option value="" disabled>
            FIlter by Origin
          </option>
          <option value="created">Created</option>
          <option value="api">API</option>
        </select>
        <select
          name=""
          value={filterOptions.selectedOrderByName}
          onChange={handleOrderByName}
        >
          <option value="" disabled>
            Order by Name
          </option>
          <option value="asc">A to Z</option>
          <option value="dsc">Z to A</option>
        </select>
        <select
          name=""
          value={filterOptions.selectedOrderByHealth}
          onChange={handleOrderByScore}
        >
          <option value="" disabled>
            Order by Health Score
          </option>
          <option value="more">More Healthy</option>
          <option value="less">Less Healthy</option>
        </select>
      </div>
      <div className={style.pageNavigation}>
        <button className={style.navigationButton} disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span style={{color:"#fff"}}>{`Page ${currentPage + 1} ${
          totalPages === 1 ? "of 1" : `of ${totalPages}`
        }`}</span>
        <button className={style.navigationButton} disabled={currentPage === totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default FilteredOptions;
