import { ADD_ACTIVITY, CLEAN_DETAIL, COUNTRY_BY_ID, FILTER_ACTIVITY, GET_ACTIVITY, GET_COUNTRIES, ORDER_CONTINENT, ORDER_COUNTRIES, ORDER_POPULATION, SEARCH_COUNTRY} from  "./action-types"

const initialState = {
    defaultCountries:[],
    allCountries:[],
    activities: [],
    detail:{}
}

let search = false;
let filterContinent = "";

const reducer = (state = initialState,action) => {
    const newCopyCountries = !search ? [...state.defaultCountries] : search
    switch (action.type) {
        case GET_ACTIVITY:
            return{
                ...state,
                activities: action.payload
            }
        case ADD_ACTIVITY:
            return{
                ...state,
                activities: action.payload
            }
        case GET_COUNTRIES:
            search = false;
            filterContinent = "";
            return {
                ...state,
                allCountries: action.payload,
                defaultCountries: action.payload
            }
        case SEARCH_COUNTRY:
            search = action.payload
            return {
                ...state,
                allCountries: action.payload
            }
        case COUNTRY_BY_ID:
            return {
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case ORDER_COUNTRIES:
            const orderCountryCopy = [...state.allCountries]
            if(action.payload === "All"){
                return{
                    ...state,
                    allCountries:newCopyCountries
                }
            }
            else if(action.payload === "A"){
                orderCountryCopy.sort((country1, country2) => country1.name.localeCompare(country2.name))
            }
            else if(action.payload === "D"){
                orderCountryCopy.sort((country1, country2) => country2.name.localeCompare(country1.name))
            }
            else if(action.payload === "alphabetically"){
                orderCountryCopy = [...state.defaultCountries]
            }
                return {
                    ...state,
                    allCountries: orderCountryCopy
                }
        case ORDER_POPULATION:
            const orderPopulationCopy = [...state.allCountries]
            if(action.payload === "All"){
                return{
                    ...state,
                    allCountries: newCopyCountries
                }
            }
            else if(action.payload === "A"){
                orderPopulationCopy.sort((country1, country2) => country1.population - country2.population)
            }
            else if(action.payload === "D"){
                orderPopulationCopy.sort((country1, country2) => country2.population - country1.population)
            }
            else if(action.payload === "population"){
                orderPopulationCopy = [...state.defaultCountries]
            }
                return {
                    ...state,
                    allCountries: orderPopulationCopy
                }
        case ORDER_CONTINENT:
            filterContinent = action.payload
            if(filterContinent === "All"){
               filterContinent = "";
                return {
                    ...state,
                    allCountries: newCopyCountries
                }
            }
            return {
                ...state,
                allCountries: newCopyCountries.filter(country => {
                    return (country.continent === filterContinent)
                }) 
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;