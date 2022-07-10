module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
        // allowNull: false,
      },
    });

    Cart.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        // allowNull: false,
      },
    });
  };

  return Cart;
};
