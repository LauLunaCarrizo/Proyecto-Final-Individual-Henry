import "./SearchBar.css"
import { useState } from "react";

function SearchBar(props) {
   
    const [name, setName] = useState("");
    const handleChange = (event) => {
       setName(event.target.value)
    }
 
    const handleClick = event => {
       event.preventDefault();
       props.onSearch(name);
       setName("");
    }
 
    return (
       <div className="SearchBar">
          <input className="Input" onChange={handleChange} value={name} type='text' placeholder="Search a Country..."/>
          <button className="Button" onClick={handleClick}>Search Country</button>
       </div>
    );
 }
 export default SearchBar;