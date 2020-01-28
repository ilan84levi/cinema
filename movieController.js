const movieLogic = require("./movieLogic");
const express = require("express");
const Movie = require("./movie")
//routing object
const router = express.Router();

//get all movies

router.get("/", async (request , response)=>{
    try{
        const movies = await movieLogic.getAllMovies();
        response.json(movies);
    }
catch(err){
    response.json(err);
}
});

//get one movie
router.get("/:id" ,async(request , response)=>{
    const id = +request.params.id;
    const movie = await movieLogic.getMovieById(id);
    if(movie){
        response.json(movie);
    }
    else{
        const message = {message:"id: " + id + " not found"};
        response.status(404).json(message);
    }
});

//add movie
router.post("/", async(request,response)=>{
    const errorDetails = await Movie.validate(request.body);
    if(errorDetails){
        response.status(400).json(errorDetails);
        return;
    }
    const movie = await movieLogic.addMovie(request.body);
    response.status(201).json(movie);
});

//update movie
router.put("/:id", async(request , response)=>{
    const id = +request.params.id;
    request.body.id = id
    const errorDetails = await Movie.validate(request.body);
    if(errorDetails){
        response.status(400).json(errorDetails);
        return;
    }
    const movie = await movieLogic.updateMovie(request.body);
    if(movie){
        response.json(movie);
    }
    else{
        const message = {message:"movie id: " + id + " not found"};
        response.status(404).json(message);
    }
});

//update partiel
router.patch("/:id", async(request , response)=>{
    const id = +request.params.id;
    request.body.id = id
    const errorDetails = Movie.validate(request.body);
    if(errorDetails){
        response.status(400).json(errorDetails);
        return;
    }

    const movie = await movieLogic.updtePartiel(request.body);
    if(movie){
        response.json(movie);
    }
    else{
        const message = {message:"movie id: " + id + " not found"};
        response.status(404).json(message);
    }
});

//delete movie
router.delete("/:id", async(request,response)=>{
    const id = +request.params.id;
    await movieLogic.deleteMovie(id);
    response.status(204).send();
});

//http://localhost:3000/api/movies
module.exports = router;

