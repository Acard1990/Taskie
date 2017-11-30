module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    assigned: {
      type: DataTypes.BOOLEAN
    }
  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Assignment.belongsTo(models.Task, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Assignment;
};
