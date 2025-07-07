const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const loginRouter = require("./routes/loginRouter");
const adminRouter = require("./routes/adminRoute");
const librarianRouter = require("./routes/librarianRoutes");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
dotenv.config();

const bookrouter = require("./routes/bookRoutes");
const memberrouter = require("./routes/memberRoutes");
const issuerouter = require("./routes/issueRoutes");
const returnrouter = require("./routes/returnRoutes");
const reportRouter = require('./routes/reportRoutes');

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", loginRouter);
app.use("/admin", adminRouter);
app.use("/librarian", librarianRouter);
app.use("/books", bookrouter);
app.use("/members",memberrouter);
app.use("/issue", issuerouter);
app.use("/returns", returnrouter);
app.use('/', reportRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
