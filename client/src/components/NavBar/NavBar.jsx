import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './NavBar.module.css'

function NavBar() {
  return (
    <nav className={style.container}>
        <ul className={style.menu}>
            <li>
                <NavLink to='/'>LANDING</NavLink>
            </li>
            <li>
                <NavLink to='/home'>HOME</NavLink>
            </li>
            <li>
                <NavLink to='/create'>FORM</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar