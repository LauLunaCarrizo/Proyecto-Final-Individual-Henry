const {Country} = require('../src/db')
const axios = require('axios')
const URL = 'http://localhost:5000/countries'

const getInformation = async () => {
    try{
        const response = await axios.get(URL)

        if(!response.data) return res.status(400).send('Faltan datos')

        const data = response.data;

        const countries = data.map((country) => {
            return {
                id: country.cca3,
                name: country.name.common,
                flagImage: country.flags.png,
                continent: country.continents[0],
                capital: country.capital?.[0] ? country.capital?.[0] : null,
                subregion: country.subregion ? country.subregion : null,
                area: country.area,
                population: country.population,
            }
        })
        const createCountry = await Country.bulkCreate(countries)
        return createCountry;
    } catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getInformation
}