const { check } = require("express-validator");

const chatMessageValidations = {
    createChatMessage:[
        check('chatId', 'El campo chatId es obligatorio').isMongoId(),
        check('userId', 'El campo userId es obligatorio').isMongoId(),
    ],
};

module.exports = chatMessageValidations;