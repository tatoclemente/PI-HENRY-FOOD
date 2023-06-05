import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
        <div>Esta es la Landing Page</div>
        <Link to='/home'>
            <button>Ir al Home</button>
        </Link>
    </>
  )
}

export default Landing