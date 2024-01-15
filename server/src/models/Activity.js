const { DataTypes } = require("sequelize")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    difficulty:{
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:1,
        max:5
      },
      defaultValue:3
    },
    duration:{
      type: DataTypes.TIME, 
      allowNull: false
    },
    season:{
      type: DataTypes.ENUM("Summer","Winter","Autumn","Spring"),
      allowNull: false
    }
  }, { timestamps: false });
};