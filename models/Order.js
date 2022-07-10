module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    total: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    slip: {
      type: DataTypes.STRING,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
  };

  return Order;
};
