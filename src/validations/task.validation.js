const Joi = require("joi");
const { objectId } = require("./custom.validation");

const searchTask = {
    query: Joi.object().keys({
        title: Joi.string(),
    })
};


const addNewTask = {
    body:Joi.object().keys({
        title:Joi.string().required(),
        description:Joi.string().required()
    }),
};

const getTaskById = {
    params: Joi.object().keys({
        videoId: Joi.string().custom(objectId)
    }),
};


module.exports ={
    searchTask,
    addNewTask,
    getTaskById
}