const router = require('express').Router();
const userController = require('./users.controller');

//GET que busque usuario
router.get('/:userName',userController.login,userController.getUser);


//DELETE que borra un usuario por su userName
router.delete('/:userName',userController.login, userController.isYou, userController.deleteUser);

//PATCH que modifica el email o el name del usuario
router.patch('/:userName',userController.login, userController.isYou, userController.patchUser);

//PATCH que cambia la contraseña
router.put('/:userName',userController.login, userController.isYou, userController.changePassword);

module.exports = router;