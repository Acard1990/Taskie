module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return User;
};
