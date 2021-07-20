'use strict';
module.exports = (sequelize, DataTypes) => {
  const IPA = sequelize.define('IPA', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
    brewery: {
      allowNull: false,
      type: DataTypes.STRING
    },
    breweryLink: {
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING
    },
    rating: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 1),
      validate: {
        max: 10,
        min: 1
      },
    },
    ABV: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 1),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },

  }, {});
  IPA.associate = function(models) {
    IPA.belongsTo(models.User, {foreignKey: 'userId'});
    IPA.hasMany(models.CrackOpen, {foreignKey: 'ipaId'});
  };
  return IPA;
};
