module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        isFloat: true,
        max: 5,
        min: 0
      }
    }
  });

  Ratings.associate = (models) => {
    Ratings.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Ratings;
};
