module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [2,150]
      }
    },
    status: {
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
        allowNull: false
      }
    });
  };


  return Task;
};
