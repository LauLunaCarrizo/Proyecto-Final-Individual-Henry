const {Activity, Country} = require("../db");

const postActivities = async (req,res)=>{
  console.log(req.body)
    try {
        const {name, difficulty, duration, season, countries} = req.body;
        if( name && difficulty && duration && season && countries){
            let existingActivity = await Activity.findOne({ where: { name } });
            if (existingActivity) {
                // Si la actividad ya existe, agrego los países relacionados a la actividad existente
                if (countries && countries.length > 0) {
                  for (const countryId of countries) {
                    const country = await Country.findByPk(countryId);
                    if (country) {
                      await existingActivity.addCountry(country);
                    }
                  }
                }
                return res.status(200).json(existingActivity);
            } else {
                const createdActivity = await Activity.create({
                  name:name,
                  difficulty:difficulty,
                  duration:duration,
                  season:season,
                });
                
                if (countries && countries.length > 0) {
                    for (const countryId of countries) {
                      const country = await Country.findByPk(countryId);
                      if (country) {
                        await createdActivity.addCountry(country);
                      }
                    }
                  }
                  return res.status(201).json(createdActivity);
                }
        }
        return res.status(401).send("Faltan datos");
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = postActivities;