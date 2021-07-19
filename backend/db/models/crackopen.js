'use strict';
module.exports = (sequelize, DataTypes) => {
  const CrackOpen = sequelize.define('CrackOpen', {
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
    ipaId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  CrackOpen.associate = function(models) {
    CrackOpen.hasMany(models.User, { foreignKey: CrackOpen.userId})
    CrackOpen.hasMany(models.IPA, {foreignKey: CrackOpen.ipaId})
  };
  return CrackOpen;
};
