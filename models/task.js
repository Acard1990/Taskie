module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,150]
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    assigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Task.hasOne(models.Assignment, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Task;
};
