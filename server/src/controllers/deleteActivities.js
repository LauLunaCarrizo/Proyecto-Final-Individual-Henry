const { Activity } = require('../db')

const deleteActivities = async (req, res) => {
     const { id } = req.params
    try{
        const activity = await Activity.findOne({where:{
            id: id
        }})

        await activity.destroy();
        res.status(200).send('Activity deleted')
    } catch (error) {
        throw Error (error.message)
    }
}

module.exports = deleteActivities;

