const { Country, Activity } = require("../db");

const getCountries = async (req,res) => {
try {
    const response = await Country.findAll({ include: Activity })

    if(response){
        res.status(200).json(response)
    }else{
      res.status(404).send("Countries Not Found")
    }
} catch (error) {
  res.status(500).send(error.message)
}
}

module.exports = getCountries;