const { check } = require("express-validator");

const chatValidations = {
    createChat:[
        check('otherUser', 'El campo otherUser es obligatorio').isMongoId(),
        check('userId', 'El campo userId es obligatorio').isMongoId(),
    ],
};

module.exports = chatValidations;