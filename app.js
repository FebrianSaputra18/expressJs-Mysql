const express = require("express");
const path = require("path");
const app = express();
const productRouter = require("./app/product/routes");
const productRouterv2 = require("./app/productv2/routes");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api/v1", productRouter);
app.use("/api/v2", productRouterv2);

app.use((req, res) => {
  res.status(404).send({
    status: "404 Not Found",
    message: "Resource " + req.originalUrl + " is not available",
  });
});

app.listen(3000, () => console.log("server: http://localhost:3000"));
