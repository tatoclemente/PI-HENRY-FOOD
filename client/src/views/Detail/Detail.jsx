import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import style from './Detail.module.css'
import DetailInfo from '../../components/DetailInfo/DetailInfo';

function Detail() {
  const [recipe, setRecipe ] = useState({});
  const {detailId} = useParams();
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`/recipes/${detailId}`)
        if(data.name) {
          setRecipe(data);
        }
        window.scrollTo(0, 0);
      } catch (error) {
        throw Error({error: error.message})
      }
    }
    fetchData()
  }, [detailId])


  

  return (
    <div className={style.detailContainer}>
      <DetailInfo recipe={recipe}/>
    </div>
  )
}

export default Detail