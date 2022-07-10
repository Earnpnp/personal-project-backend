require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");
const { sequelize } = require("./models");
const { urlencoded } = require("express");

// sequelize.sync({ alter: true });

const app = express();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/cart", authenticate, cartRoute);
app.use("/users", authenticate, userRoute);
app.use("/order", authenticate, orderRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(8006, () => console.log("Server running at port 8006"));
