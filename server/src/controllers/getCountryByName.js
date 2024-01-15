const { Op } = require("sequelize");
const { Country } = require("../db");

const getCountryByName = async (req,res) => {
  const {name} = req.query;
try {
  let country = await Country.findAll({where:{name:{[Op.iLike]:`${name}%`}}})
    if (country !== null) {
      return res.status(200).json(country);
  } else {
      res.status(404).send("A country with the name entered has not been found");
  }
} catch (error) {
  return res.status(500).json(error.message)
}
}

module.exports = getCountryByName;