const dbconnect = require("./config/database");
const verifyJWT = require("./middleware/verifyJWT");

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config({ path: "config/config.env" });

// built-in middleware to handle urlencoded form data
app.use(bodyParser.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

dbconnect();

app.use("/user", require("./routes/userRouter"));
app.use(verifyJWT);
app.use("/api", require("./routes/api/employees"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
