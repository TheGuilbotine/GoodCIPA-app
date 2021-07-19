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
      type: DataTypes.INTEGER,
      references: {model: 'Users'}
    },
    ipaId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'IPAs'}
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
    CrackOpen.belongsTo(models.User, { foreignKey: 'userId'})
    CrackOpen.belongsTo(models.IPA, {foreignKey: 'ipaId'})
  };
  return CrackOpen;
};
