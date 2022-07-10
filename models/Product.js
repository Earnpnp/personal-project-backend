module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    nameProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productType: {
      type: DataTypes.ENUM("desk", "wheel"),
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.hasMany(models.OrderItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
    });

    Product.hasMany(models.Cart, {
      foreignKey: {
        name: "productId",
        // allowNull: false,
      },
    });
  };

  return Product;
};
