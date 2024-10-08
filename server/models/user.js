module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  User.associate = function(models) {
    User.hasOne(models.UserProfile, {
      foreignKey: 'userId',
      as: 'profile',
    });
  };

  return User;
};
