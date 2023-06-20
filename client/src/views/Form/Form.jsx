import React, { useState, useEffect } from 'react'
import style from './Form.module.css';
import { useSelector } from 'react-redux';
// import { dietTypes } from '../../utils/data';

//Import Icons
import CloudUpload from '../../images/cloud-upload-icon.png';
import FileImage from '../../images/file-image.png';
import TrashWhite from '../../images/trash-white.png';
import TrashRed from '../../images/trash-red.png';
import DeleteIcon from '../../images/remove-icon.png';


function Form({postRecipe}) {

  const dietTypes = useSelector((state) => state.diets);

  const validate = (form, fileName) => {
    console.log(fileName);
    console.log(form.image);
    const errors = {}

    if(form.name.length === 0) { errors.name = "Name is required" }

    if(form.name.length > 20) { errors.name = "Name must be less than 20 characters" }

    if (fileName === "No selected image") {
      errors.image = "Image is required";
    }

    return errors
  }

  //-----------------------------------------------------------------------------------
  // ERROS HANDLERS

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    healthScore: ""
  })

  //-----------------------------------------------------------------------------------
    // MAIN CATEGORIES HANDLERS

  const [form, setForm] = useState({
    name: "",
    summary:"",
    healthScore: 0,
    image:null
  })


  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const fieldErrors = validate({ ...form, [name]: value }, fileName);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors[name] }));
  };
//-----------------------------------------------------------------------------------
  /// STEPS HANDLERS
  
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep ] = useState('')

  const handleAddStep = (event) => {
    event.preventDefault();
    if(currentStep) {
      setSteps([...steps, currentStep])
      setCurrentStep('')
    }
  }

  const handleDeleteStep = (index) => {
    const newStep = [...steps];
    newStep.splice(index, 1);
    setSteps(newStep);
  }

  const handleChangeStep = (event) => {
    const { value } = event.target;
    setCurrentStep(value)
  }
//-----------------------------------------------------------------------------------
   /// DIET TYPES HANDLERS

  const [selectedDiest, setSelectedDiets ] = useState([])

  // const [diets, setDiets] = useState([])

  const handleCheckboxChange = (event) => {    
    const { value } = event.target;
    setSelectedDiets((prevSelectedDiets)=> {
      if(prevSelectedDiets.includes(value)) {
        return prevSelectedDiets.filter(diet => diet !== value)
      } else {
        return [...prevSelectedDiets, value]
      }
      
    })
  }

//-----------------------------------------------------------------------------------
  // IMAGE HANDLERS

  const [imageFile, setImageFile] = useState(null)
  const [fileName, setFilename] = useState("No selected image")

  const handleImageChange = (event) => {
    const {files} = event.target;
    if(files && files[0]){

      const selectedFile = files[0];
      setForm({ ...form, image: selectedFile });
      setFilename(files[0].name)
      setImageFile(URL.createObjectURL(files[0]))
    } else {
      setForm({ ...form, image: null });
      setFilename("No selected image");
      setImageFile(null);
    }

    const imageErrors = validate(form, files && files[0] ? files[0].name : "No selected image");
    setErrors((prevErrors) => ({ ...prevErrors, image: imageErrors.image }));
  }

  const handleDeleteClick = () => {
    setFilename("No selected image")
    setImageFile(null)
    setForm({ ...form, image: null })

    const imageErrors = validate({ ...form, image: null }, "No selected image");
    setErrors((prevErrors) => ({ ...prevErrors, image: imageErrors.image }));
  
  }

  
  // useEffect(() => {
  //   setErrors(validate(form, fileName));
  // }, [form, fileName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // window.alert("Simulamos que envio el formulario")

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('summary', form.summary);
    formData.append('healthScore', form.healthScore);
    formData.append('image', form.image);
    formData.append('steps', JSON.stringify(steps));
    formData.append('diets', JSON.stringify(selectedDiest));

    postRecipe(formData)

    setForm({
      name: "",
      image: null,
      summary:"",
      healthScore: 0
    })

    setSteps([])

    setSelectedDiets([])

    setImageFile(null)
    setFilename("No selected image")

  }


  const handleClick = () => {
    document.querySelector("#upload-input").click()
  }

  return (
    <form className={style.formContainer}>
      <div className={style.bannerContainer}>
        <div className={style.bannerShadow}></div>
        <h1>GIVE US YOUR BEST DISH!</h1>
      </div>


{/*---------------- NOMBRE DE LA RECETA ----------------------*/}
      <div className={style.inputContainer}>
      <label>Recipe name:</label>
        <input 
        className={style.input} 
        type="text" value={form.name} 
        placeholder='Enter the name of your recipe...'
        onChange={handleChange} name="name"/>
        {errors.name && <p className={style.warning}>{errors.name}</p>}
      </div>

{/*---------------- RESUMEN DEL PLATO -----------------------*/}
      <div className={style.inputContainer}>
      <label>Dish Summary:</label>
        <textarea 
        className={style.textarea} 
        type="text" 
        value={form.summary} 
        placeholder='Describe the dish, for example: most important ingredients, its origin or brief history...'
        onChange={handleChange} 
        name="summary"/>
      </div>


{/*-------------- PUNTAJE DE SALUD -------------------------*/}
      <div className={style.inputContainer}>
      <label>Health Score: <span className={style.score}>{form.healthScore}</span></label>
        <input 
        id='healthScoreRange'
        className={style.inputScore} 
        type="range" 
        min={0}
        max={100}
        value={form.healthScore} 
        onChange={handleChange} 
        name='healthScore' />
      </div>


{/* ------------ PASO A PASO ---------------------------*/}
      <section className={style.stepsContainer}>
        <label>Step by Step</label>
        <div className={style.inputSteps}>
          <input 
          className={style.inputStep} 
          type="text" 
          value={currentStep} 
          placeholder='Enter one step at a time...'
          onChange={handleChangeStep} name='steps'/>
        </div>
        <button onClick={handleAddStep}>ADD STEP</button>
        <ul className={style.stepsList}>
          {steps.length > 0 && steps.map((step, index) => {
            return (<li 
                      className={style.stepsListItem}
                      key={index}>
                      <div className={style.stepsListItemTextContainer}>
                        <span className={style.stepsListItemText}>
                          {step}
                        </span>
                      </div>
                      <img src={DeleteIcon} 
                      className={style.deleteIcon}
                      onClick={()=>handleDeleteStep(index)} />
                    </li>)
          })}
        </ul>
      </section>


{/* ------------------ IMAGEN -----------------*/}
      <div 
      className={style.uploaderContainer}
      onClick={handleClick}
      >
        <label></label>
        <input 
        id='upload-input'
        type="file" 
        accept='image/*' 

        hidden
        name='image'
        onChange={
          handleImageChange
        } 
        />

        {imageFile? <img src={imageFile} alt={fileName} className={style.image}/> :
        <>
          <img src={CloudUpload} className={style.uploaderIcon}/>
          <p>Browse Files to Upload</p>
        </>}
      </div>

      <section className={style.fileNameContainer}>
        <img src={FileImage} className={style.fileIcon}/>
        <span className={style.nameContainer}>
          <span className={style.fileName}>
            {fileName} -
          </span>
          {imageFile?<img src={TrashRed} className={style.deleteIcon} onClick={handleDeleteClick} />: <img src={TrashWhite} className={style.deleteIconNull} />}
        </span>

        {errors.image && <p className={style.warning}>{errors.image}</p>}
      </section>


{/*---------------- DIET TYPES ----------------------*/}
      <section className={style.inputContainer}>
      <label>Diet Types</label>
      <div className={style.dietsContainer}>
        {dietTypes.map((diet, index) => {
          return (<div 
                  className={style.dietsCheckboxContainer}
                  key={index}>
                    <input 
                      type="checkbox" 
                      value={diet} 
                      name="diets" 
                      checked={selectedDiest.includes(diet)}
                      className={style.dietsCheckbox}
                      onChange={handleCheckboxChange} 
                    />
                    <label>{diet}</label>
                  </div>)
        })}
      </div>
      </section>

      <button 
        type='submit' 
        className={style.submitButton}
        onClick={handleSubmit}>Submit</button>
    </form>
  )
}
export default Form