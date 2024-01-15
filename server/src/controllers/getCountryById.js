const { Country, Activity } = require("../db")


const getCountryById= async (req,res) => {
try {
    let id = req.params.idPais;
    id = id.toUpperCase();
    const response = await Country.findOne({ where: {id}, include: Activity})
    if(response.name){
        return res.status(200).json(response)
    }
    res.status(400)
} catch (error) {
  res.status(500).send(error.message)
}
}

module.exports = getCountryById;
