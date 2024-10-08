module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });

  UserProfile.associate = function(models) {
    UserProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return UserProfile;
};