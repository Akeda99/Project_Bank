const { Router } = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validateField.middlewares");

const router= Router();



router.post('/signup', [
    check('name',' Name is required').not().isEmpty(),
    check('password', 'the password is mandatory ').not().isEmpty(),
    validateFields
],register);
router.post('/login',[
    check('accountNumber',' The entered account number is mandatory').not().isEmpty(),
    check('password', 'the password is mandatory ').not().isEmpty(),
    validateFields
], login);



module.exports={
    usersRouter: router
}