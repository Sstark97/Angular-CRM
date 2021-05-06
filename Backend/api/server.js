const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./users/users.model');
const userRouter = require('./users');
const contactRouter = require('./contacts');
const userController = require('./users/users.controller');

mongoose.connect('mongodb://localhost/CRM');


const app = express();
const PORT = 3000;

//MiddleWares
app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
    let body = req.body;
    let { userName, email, password } = body;
  
    User.create({
      userName,
      email,
      password: bcrypt.hashSync(password, 10)
    })
    .then(user => {
      delete user.password;
      return res.status(200).json(user)
    })
    .catch(err => {
        return res.status(400).send('This user just exist');
    });
});

app.post('/login', (req, res) => {
    User.findOne({ userName: req.body.userName })
      .then( usuarioDB => {
        console.log(usuarioDB);
      
        // Verifica que exista un usuario con el mail escrita por el usuario.
           if (!usuarioDB) {
              return res.status(400).json({message: "User/password are incorrect"})
           }
          // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
         if (! bcrypt.compareSync(req.body.password, usuarioDB.password)){
           console.log('AKi');
            return res.status(400).send("User/password are incorrect");
         }
  
          // Genera el token de autenticación
          console.log('Todo bien');
          let token = jwt.sign({ usuario: usuarioDB }, "CRMTOPSECRET")
          res.json({
            usuario: usuarioDB,
            token,
          })
  
      })
      .catch(erro =>  {
         return res.status(500).json( erro )
     })
});

app.use('/users',userRouter);
app.use('/:userName',userController.login,userController.isYou,contactRouter);


//Listen Port
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
});