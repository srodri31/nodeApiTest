const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const users = require("./routes/UserRoutes");
const sequelize = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", users);

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Database working fine");
    })
    .catch(err => {
        console.log(err, "Something went wrong with database update");
    });

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
