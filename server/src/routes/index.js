const express = require("express")
const getCountryById = require("../controllers/getCountryById");
const getCountries = require("../controllers/getCountries");
const postActivities = require("../controllers/postActivities");
const getCountryByName = require("../controllers/getCountryByName");
const getActivities = require("../controllers/getActivities");
const deleteActivities = require("../controllers/deleteActivities");
const Router = express.Router();


Router.get("/countries",getCountries)
Router.get("/countries/name",getCountryByName)
Router.get("/countries/:idPais",getCountryById)
Router.post("/activities",postActivities)
Router.get("/activities",getActivities)
Router.delete('/activities/:id', deleteActivities)

module.exports = Router;
