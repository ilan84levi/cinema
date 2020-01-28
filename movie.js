const Joi = require("joi");
class Movie{
    constructor(id,code,name, director , time){
        this.id = id;
        this.code = code;
        this.name = name;
        this.director = director;
        this.time = time;
    }


    static validate(movieValidate){
        const validateSchema = {
            id: Joi.number().min(1),
            code: Joi.string().required().min(3).max(50),
            name:Joi.string().min(3).max(50),
            director:Joi.string().min(3).max(50),
            time: Joi.number().min(1).max(500)
        };

        const error = Joi.validate(movieValidate , validateSchema , {abortEarly: false}).error;
        if(error){
            return error.details.map(err => err.message);
        }
return null;
    }
}

module.exports = Movie;