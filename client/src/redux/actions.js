import { 
    ADD_ACTIVITY,
    CLEAN_DETAIL,
    COUNTRY_BY_ID,
    FILTER_ACTIVITY,
    GET_ACTIVITY, 
    GET_COUNTRIES, 
    ORDER_CONTINENT, 
    ORDER_COUNTRIES, 
    ORDER_POPULATION,
    SEARCH_COUNTRY
} from  "./action-types"

import axios from "axios"

export const getActivity = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/activities')
            return dispatch({
                type: GET_ACTIVITY,
                payload: data
            })
        } catch (error) {
            alert(error.message);
        }
    }
}

export const addActivity = (activity) => {
    const endpoint = 'http://localhost:3001/activities'
    return async (dispatch) => {
        try {
            const {data} = await axios.post(endpoint,activity)
            return dispatch({
                type:ADD_ACTIVITY,
                payload:data
            });
        } catch (error) {
            alert(error.message)
        }
    }
}

export const deleteActivity = (activityId) => {
    const endpoint = 'http://localhost:3001/activities/' 
    return async () => {
        try {
            const id = activityId
            const response = await axios.delete(endpoint + id)
        } catch (error) {
            alert(error.message)
        }
    }
}

export const filterActivity = (filter) => {
    return {
        type: FILTER_ACTIVITY,
        payload: filter
    }
}

export const getCountries = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/countries')
            return dispatch({
                type: GET_COUNTRIES,
                payload: data
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export const searchCountry = (name) => {
    return async (dispatch,getState) => {
        try {
            if(name.trim() === ""){
                const defaultCountries = getState().defaultCountries
                return dispatch({
                    type: SEARCH_COUNTRY,
                    payload: defaultCountries
                })
            }
            const {data} = await axios.get(`http://localhost:3001/countries/name?name=${name}`)
            return dispatch({
                type: SEARCH_COUNTRY,
                payload: data
            })
        } catch (error) {
            alert(error.response.data.message)
            alert(error.message);
        }
    }
}

export const countryById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/countries/${id}`)
            const data = response.data
            return dispatch({
                type: COUNTRY_BY_ID,
                payload: data
            })
        } catch (error) {
            alert(error.message);
        }
    }
}

export const orderCountries = (order) => {
    return {
        type: ORDER_COUNTRIES,
        payload: order
    }
}

export const orderPopulation = (order) => {
    return {
        type: ORDER_POPULATION,
        payload: order
    }
}

export const orderContinent = (order) => {
    return {
        type: ORDER_CONTINENT,
        payload: order
    }
}

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL,
        payload: {}
    }
}