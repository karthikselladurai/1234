const logger = require('./logger')
const mongoose = require("mongoose");
const mongodb = require('./config/dbconfig')

mongoose.set("strictQuery", false);
mongoose.connect(mongodb.url, { useNewUrlParser: true }).then(() => {
  logger.info({ message: "Mongo DB connected successfully" })
});
