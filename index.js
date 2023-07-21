const express = require("express");
const app = express();
const port = 3000;
require("./connection/connection");
const UserRoute = require("./routes/UserRoutes");

app.use("/api", UserRoute);

app.listen(port, () => {
  console.log("listening on port" + port);
});
