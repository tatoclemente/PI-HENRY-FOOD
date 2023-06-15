import React from 'react'
import { Link } from 'react-router-dom'
import style from './Landing.module.css'

function Landing() {
  return (
    <div className={style.landingContainer}>
        <div className={style.landingTitle}>Welcome To Henry Food App</div>
        <Link className={style.landingLink} to='/home'>
            <button className={style.landingButton}>Go To Home</button>
        </Link>
    </div>
  )
}

export default Landing