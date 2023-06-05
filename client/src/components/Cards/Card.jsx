import React from 'react'
import style from './Card.module.css'

function Card(props) {
  return (
    <div className={style.container}>
        <p>{props.name}</p>
        <img 
        className={style.image}
        src={props.image} alt={props.name} />
    </div>
  )
}

export default Card