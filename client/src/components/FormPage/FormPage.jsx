import { useEffect, useState } from 'react';
import { addActivity, getCountries } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validation from './validation';
import "./FormPage.css"

export default function FormPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allCountries = useSelector((state) => state.allCountries)
    const [errors, setErrors] = useState({})
    const [showAlert, setShowAlert] = useState(false); // Variable de estado para mostrar la alerta
    
    const [activity, setActivity] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countries:[]
    })

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                alert('Actividad creada correctamente');
                navigate("/home");
            }, 0);
        }
    }, [showAlert, navigate]);

    //* HANDLERS

    const handleSelect = (event) => {
        const selectedCountryId = event.target.value;

        const countrySelected = activity.countries.includes(selectedCountryId);

        if (countrySelected) {
            alert('Este país ya fue seleccionado');
            return;
        } else if (selectedCountryId === "name") {
            return;
        } else if (activity.countries.length >= 5) {
            alert('Solo puedes seleccionar 5 países');
            return;
        }

        const selectedCountry = allCountries.find((country) => country.id === selectedCountryId);

        // Verificar si el país ya está en la lista de países seleccionados.
        const isCountrySelected = activity.countries.some((country) => country.id === selectedCountryId);

        if (!isCountrySelected) {
            setActivity((activity) => ({
                ...activity,
                countries: [...activity.countries, selectedCountry.id],
            }));
        }
    };

    const handleRemoveCountry = (countryId) => {
        const updatedCountries = activity.countries.filter((selectedCountry) => selectedCountry !== countryId);
        setActivity((activity) => ({
            ...activity,
            countries: updatedCountries,
        }));
        setShowAlert(false);
    };

    const handleChange = (event) => {
        setActivity({
            ...activity,
            [event.target.name]: event.target.value
        });
        setErrors(validation(activity));
     }
  
     const handleSubmit = (event) => {
        event.preventDefault();
        if (!activity || !activity.name || !activity.difficulty || !activity.duration || !activity.season || !activity.countries.length) {
            alert('Completa todos los campos requeridos');
            return;
        }
        dispatch(addActivity(activity));
        setShowAlert(true);
    };
    console.log(activity)
return (
    <div className='form'>
        <form onSubmit={(event) => handleSubmit(event)}>
        <hr />
        <div>
        {errors.name && <p>{errors.name}</p>}
            <h3>Name</h3>
            <input
                type="text"
                placeholder="Name of the activity"
                name="name"
                value={activity.name}
                onChange={handleChange}
            />
        </div>
        <hr />
        <div>
        {errors.difficulty && <p>{errors.dificulty}</p>}
            <h3>Dificulty</h3>
            <section  >
                <section>
                    <label htmlFor="1">1</label>
                    <input type="radio" id="1" name="difficulty" value="1" checked={activity.difficulty === "1"} onChange={handleChange} />
                </section>
                <section>
                    <label htmlFor="2">2</label>
                    <input type="radio" id="2" name="difficulty" value="2" checked={activity.difficulty === "2"} onChange={handleChange} />
                </section>
                <section>
                    <label htmlFor="3">3</label>
                    <input type="radio" id="3" name="difficulty" value="3" checked={activity.difficulty === "3"} onChange={handleChange} />
                </section>
                <section>
                    <label htmlFor="4">4</label>
                    <input type="radio" id="4" name="difficulty" value="4" checked={activity.difficulty === "4"} onChange={handleChange} />
                </section>
                <section>
                    <label htmlFor="5">5</label>
                    <input type="radio" id="5" name="difficulty" value="5" checked={activity.difficulty === "5"} onChange={handleChange} />
                </section>
            </section>
        </div>
        <hr />
        <div>
        {errors.duration && <p>{errors.duration}</p>}
            <h3>Duration</h3>
            <input 
                type="time"
                name="duration" 
                value={activity.duration} 
                onChange={handleChange} 
            />
        </div>
        <hr />
        <div>
        {errors.season && <p>{errors.season}</p>}
            <h3>Seasons</h3>
            <section >
                <section>
                    <label htmlFor="Verano">Verano</label>
                    <input type="radio" id="Summer" name="season" value="Summer" checked={activity.season === "Summer"} onChange={handleChange} />
                </section>
                <section>
                    <label htmlFor="Invierno">Invierno</label>
                    <input type="radio" id="Winter" name="season" value="Winter" checked={activity.season === "Winter"} onChange={handleChange} />
                </section>
                <section>
                    <label htmlFor="Otoño">Otoño</label>
                    <input type="radio" id="Autumn" name="season" value="Autumn" checked={activity.season === "Autumn"} onChange={handleChange} />
                </section>
                <section>
                    <label htmlFor="Primavera">Primavera</label>
                    <input type="radio" id="Spring" name="season" value="Spring" checked={activity.season === "Spring"} onChange={handleChange} />
                </section>
            </section>
        </div>
        <hr />
        <div>
            <h3>Country/Countries</h3>
            {errors.countries && <p>{errors.countries}</p>}
            <select onChange={(event) => handleSelect(event)}>
            <option value="name">Choose a country</option>
                {allCountries.map((country) => {
                    return (
                        <option 
                        key={country.id} 
                        value={country.id}>
                            {country.name}
                        </option>
                            );
                })}
            </select>
        </div>
        <div>
        <label>Selected Countries:</label>
        <div >
            {activity.countries.map((selectedCountry) => (
            <div key={selectedCountry} >
                <button onClick={() => handleRemoveCountry(selectedCountry)}>
                    x
                </button>
            {(allCountries.find((country) => country.id === selectedCountry)).name}
            </div>
            ))}
        </div>
            </div>
        <hr />
            <button 
            type='submit'
            disabled={activity.name === '' || activity.difficulty === '' ||activity.duration === '' || activity.seasons === '' || activity.countries === ''}
            >Save Activity</button>
        </form>
    </div>
);
}
