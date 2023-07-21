const express = require("express");
const UserRoute = express();
const UserController = require("../controller/UserController");
UserRoute.use(express.json());

UserRoute.post("/register", UserController.register);
UserRoute.post("/login", UserController.login);
UserRoute.put("/update", UserController.upDatePassword);
UserRoute.delete("/delete", UserController.deleteUser);
UserRoute.get("/alluser", UserController.GetAlluser);

module.exports = UserRoute;
