import React from 'react'
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipes } from '../../redux/actions'


function Home() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getRecipes());
  }, [dispatch])

  return (
    <div>
      <CardsContainer />
    </div>
  )
}

export default Home