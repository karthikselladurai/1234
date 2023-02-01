require('dotenv').config();
const logger = require('./logger')
const express = require("express");
const app = express();
let server = require("http").Server(app);
let cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('../src/routes')



app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes)
require('./dbConn')

module.exports = server;