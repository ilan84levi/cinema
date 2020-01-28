const Movie = require("./movie");
const fs = require("fs");

function getMoviesFromFile() {
    const promise = new Promise((resolve, reject) => {
        fs.readFile("./movies.json", "utf-8", (err, fileContent) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const movies = JSON.parse(fileContent);
                    resolve(movies)
                } catch (err) {
                    reject(err)
                }
            }
        })
    });
    return promise;
}


function saveMovieToFile(movie) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./movies.json", JSON.stringify(movie), err => {
            if (err) {
                reject(err);
            } else {
                resolve("done")
            }
        });
    });
}



//get all
async function getAllMovies() {
    const movies = await getMoviesFromFile();
    return movies;
}
//get one
async function getMovieById(id) {
    const movies = await getMoviesFromFile();
    return movies.find(m => m.id === id);
}

//post (add)
async function addMovie(newMovie) {
    const movies = await getMoviesFromFile();
    const id = movies.length + 1;
    const movie = new Movie(id, newMovie.code, newMovie.name, newMovie.director, newMovie.time);
    movies.push(movie)
    await saveMovieToFile(movies);
    return movie;
}

//put (update)
async function updateMovie(movie) {
    const movies = await getMoviesFromFile();
    const movieToUpdate = movies.find(m => m.id === movie.id);
    if (movieToUpdate) {
        movieToUpdate.code = movie.code;
        movieToUpdate.name = movie.name;
        movieToUpdate.director = movie.director;
        movieToUpdate.time = movie.time;
        await  saveMovieToFile(movies);
    }
    return movieToUpdate;
}
//patch (update partial)
async function updtePartiel(movie) {
    const movies = await getMoviesFromFile();
    const movieToUpdate = movies.find(m => m.id === movie.id);
    if (movieToUpdate) {
        if (movie.code) {
            movieToUpdate.code = movie.code;
        }
        if (movie.name) {
            movieToUpdate.name = movie.name;
        }
        if (movie.director) {
            movieToUpdate.director = movie.director;
        }
        if (movie.time) {
            movieToUpdate.time = movie.time;
        }
        await saveMovieToFile(movies);
    }
    return movieToUpdate;
}

//delete
async function deleteMovie(id) {
    const movies = await getMoviesFromFile();
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === id) {
            movies.splice(i, 1);
            break;
        }
    }
    await saveMovieToFile(movies);
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    updtePartiel,
    deleteMovie
}