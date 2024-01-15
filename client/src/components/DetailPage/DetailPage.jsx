import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActivityCard from "../ActivityCard/ActivityCard";
import { cleanDetail, countryById, getActivity } from "../../redux/actions";
import "./DetailPage.css"

export default function DetailPage(){
const {id} = useParams()
const dispatch = useDispatch();


const detail = useSelector(state => state.detail);
const activities = useSelector(state => state.activities);
const imageUrl = detail.flagImage

useEffect(() => {
  dispatch(countryById(id));
  dispatch(getActivity())
  return () => {
    dispatch(cleanDetail())
  }
}, []);

const actividad = activities.filter((activity) => {
  return activity.Countries.some(country => country.id === id);
})

return (
  <div className="detail" style={{background: `url(${imageUrl})`}}>
    <div className="countryCard">   
        <h2 className="info">ID: {detail.id}</h2>
        <h2 className="info">Country: {detail.name}</h2>
        <img src={detail.flagImage} alt="" className="imageDetail"></img>
        <h2 className="info">Continent: {detail.continent}</h2>
        <h2 className="info">Capital: {detail.capital}</h2>
        <h2 className="info">Subregion: {detail.subregion}</h2>
        <h2 className="info">Area: {detail.area}</h2>
        <h2 className="info">Population: {detail.population}</h2>
    </div>
    <div className="activityCard">
      {actividad.length ? actividad.map((activity) => {
        return (
          <div className="actividad">
            <ActivityCard 
              id={activity.id}
              key={activity.id}
              name={activity.name}
              difficulty={activity.difficulty}
              duration={activity.duration}
              season={activity.season}
            />
          </div>
        )
      }) : (
    <h2 className="text"> No hay actividades creadas en un pais que corresponda a este continente</h2>
      )}
    </div>
  </div>
);
}
