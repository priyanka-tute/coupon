var mongoose = require("mongoose");
var uri = `mongodb+srv://tutedude:${process.env.MONGO_PASSWORD}@cluster0.osgcx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});