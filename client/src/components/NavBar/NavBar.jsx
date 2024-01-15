import { Link} from "react-router-dom";
import "./NavBar.css"
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { orderContinent, orderCountries, orderPopulation } from "../../redux/actions";

export default function NavBar(props){
    const dispatch = useDispatch();
    const setCurrentPage = props.setCurrentPage
    
    const handleOrder = (event) => {
        dispatch(orderCountries(event.target.value))
        setCurrentPage(1);
      }
    
      const handlePopulation = (event) => {
        dispatch(orderPopulation(event.target.value))
        setCurrentPage(1);
      }
    
      const handleContinents = (event) => {
        dispatch(orderContinent(event.target.value))
        setCurrentPage(1);
      }
    return (
    <>
        <div className="NavBar">
          <div className="ButtonsNInput">
            <div className="botonForm">
            <Link to={`/form`}>
            <button>Create Activity</button>
            </Link>
            </div>
            <div className="searchBar">
            <SearchBar onSearch={props.onSearch}></SearchBar>
            </div>
          </div>
            <div className="Filters">
                <div className="FilterByName">
                <select className="selectOrder" onChange={handleOrder} name="Order">
          <option value="All">Empty Filter</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
                </select>
                <i></i>
                </div>
                <div className="FilterByPopulation">
                <select className="selectPopulation" onChange={handlePopulation} name="Population">
          <option value="All">Empty Filter</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
                </select>
                <i></i>
                </div>
                <div className="FilterByContinent">
                <select className="selectContinent" onChange={handleContinents}>
          <option value="All">Empty Filter</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
                </select>
                <i></i>
                </div>
            </div>
        </div>
    </>
    );
}