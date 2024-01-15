const { Activity, Country } = require("../db")

const getActivities= async (req,res) => {
try {
    const allActivities = await Activity.findAll({include:Country})
    if(allActivities){
        res.status(200).json(allActivities)
    }else{
      res.status(400).send("Activities Not Found")
    }
} catch (error) {
  res.status(500).send(error.message)
}
}

module.exports = getActivities;