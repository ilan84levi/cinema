const express = require("express");
const movieController = require("./movieController");
const server = express();

server.use(express.json())

server.use("/api/movies" , movieController)

server.listen(3000,()=>{
    console.log("listning on http://localhost:3000")
});

