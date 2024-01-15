import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getActivity, getCountries } from "../../redux/actions";
import CountryCard from '../CountryCard/CountryCard';
import Pagination from '../pagination/pagination';
import "./homePage.css"

export default function HomePage({currentPage, setCurrentPage}){
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

useEffect(() => {
  dispatch(getCountries());
}, [dispatch]);

useEffect(() => {
  dispatch(getActivity());
}, [dispatch]);


//* LOGICA DE PAGINADO
const itemsPerPage = 10;
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const visibleItems = allCountries.slice(startIndex, endIndex);

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber)
}

return (
    <div className="homePage">
      <div className='body'>
        {
        allCountries.length ? 
        <div >
          <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allCountries.length / itemsPerPage)}
          pageChange={paginate}
          ></Pagination>
        </div> : 
        <div>
          <p>No existen coincidencias con los filtros aplicados</p>
        </div>
        }
      {
        visibleItems.map((country,index)=>(
          <CountryCard 
          key={index}
          id={country.id}
          flagImage={country.flagImage}
          name={country.name}
          continent={country.continent}
          ></CountryCard> 
          ))
        }
        </div>
    </div>
  );
}
