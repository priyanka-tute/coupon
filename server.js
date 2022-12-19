var app = require("./app");
//  var debug = require("debug")("file-upload-nodejs:server");
// var http = require("http");

// var server = http.createServer(() => {
//   console.log("Server is up...");
// });

app.get("/",(req,res)=>{
  res.send("Welcome home");
})
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server listening on port ", port);
});
