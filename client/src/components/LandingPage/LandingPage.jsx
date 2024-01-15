import './LandingPage.css'
import { Link } from 'react-router-dom';

export default function LandingPage(){

    return (
    <div className='LandingBody'>
        <button>
        <Link to="/home" >Home Page</Link>    
        </button>
    </div>
    );
}

