import "./CountryCard.css"
import {Link} from 'react-router-dom'

export default function CountryCard(props){
    return (
        <div className="Card">
            <Link to={`/detail/${props.id}`}>
            <img className="image" src={props.flagImage} alt="" />
            </Link>
            <h3>{props.name}</h3>
            <h3>{props.continent}</h3>
        </div>
    );
}
