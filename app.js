const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8"]);

const expressLayouts = require ("express-ejs-layouts")
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(expressLayouts);
app.use(express.static("public"));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));
const connectDB = require("./server/config/db");
connectDB ();

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));