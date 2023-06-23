import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import style from './Detail.module.css'
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import Spinner from '../../components/Spinner/Spinner'

function Detail() {
  const [recipe, setRecipe ] = useState({});
  const {detailId} = useParams();
  const [loading, setLoading] = useState(false)
  
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`/recipes/${detailId}`)
        if(data.name) {
          setRecipe(data);
        }
        window.scrollTo(0, 0);
        setLoading(false)
      } catch (error) {
        throw Error({error: error.message})
      }
    }
    fetchData()
  }, [detailId])


  

  return (
    <div className={style.detailContainer}>
      {loading
      ? <Spinner />
      : <DetailInfo recipe={recipe}/>
      }
    </div>
  )
}

export default Detail