import React, { useState } from 'react'
import style from './Form.module.css';

function Form() {

  const [form, setForm] = useState({
    name: "",
    image: "",
    healthScore: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({...form, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert("Simulamos que envio el formulario")
    setForm({
      name: "",
      image: "",
      healthScore: ""
    })
  }

  return (
    <form className={style.formContainer}>
      <div>
        <label>Name:</label>
        <input type="text" value={form.name} onChange={handleChange} name="name"/>
      </div>
      <div>
        <label>Image</label>
        <input type="text" value={form.image} onChange={handleChange} name='image'/>
      </div>
      <div>
        <label>Health Score</label>
        <input type="text" value={form.healthScore} onChange={handleChange} name='healthScore'/>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Form