const router = require('express').Router();
const contactController = require('./contacs.controller');


//POST de un contacto
router.post('/contacts',contactController.createContact);

//GET de un contacto
router.get('/contacts/:contactName',contactController.getContact);

//GET todos los contactos de un usuario
router.get('/contacts',contactController.getAllContacts);

//DELETE de un contacto
router.delete('/contacts/:id',contactController.deleteContact);

//DELETE de un contacto
router.delete('/contacts',contactController.deleteAllContacts);

//PATCH de un contacto
router.patch('/contacts/:id',contactController.patchAContact);

//PATCH que modifica el contacted de un contacto
router.patch('/contacts',contactController.allCompleted);

module.exports = router;