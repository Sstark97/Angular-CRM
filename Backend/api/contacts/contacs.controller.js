const Contact = require('./contacts.model');
const User = require('../users/users.model');

const getContact = (req,res) => {
    const contactName = req.params.contactName;
    console.log(contactName);

    Contact.findOne({contactName:contactName})
           .then(contact => {
               newContact = {
                   contactName: contact.contactName,
                   email: contact.email,
                   contacted: contact.contacted
               }

               return res.status(200).json(newContact);
           })
           .catch(error => {
            if(error.errors?.contactName?.message === 'The contactname is required'){
                return res.status(404).send('The contactname is required');
               } else if(error.errors?.user?.message === 'This user not exist'){
                return res.status(404).send('This user not exist');
               }
           })

}

const getAllContacts = (req,res) => {
    const userName = req.headers['userName'];

    Contact.find({owner:userName})
           .then(contacts => {
               contacts.map(contact => {
                newContact = {
                    contactName: contact.contactName,
                    email: contact.email,
                    contacted: contact.contacted
                }
                contact = {...newContact};
               })
               return res.status(200).json(contacts);
           })
           .catch(error => {
            if(error.errors?.contactName?.message === 'The contactname is required'){
                return res.status(404).send('The contactname is required');
               } else if(error.errors?.user?.message === 'This user not exist'){
                return res.status(404).send('This user not exist');
               }
           })

}

const createContact = (req,res) => {
    const contact = req.body;
    const user = req.user.usuario.userName;
    contact.user = user;

    Contact.create(contact)
           .then(contact => {
               console.log(user);
               User.findOne({userName:user})
                   .then(user => {
                       console.log(user);
                       user.contactsId.push(contact);
                       user.save();
                       return res.status(200).json(contact);
                    });
           })
           .catch(error => {
               if(error.errors?.contactName?.message === 'The contactname is required'){
                return res.status(404).send('The contactname is required');
               } else if(error.errors?.user?.message === 'This user not exist'){
                return res.status(404).send('This user not exist');
               }
           })
}

const patchAContact = (req,res) => {
    const {contactName, email, contacted} = req.body;
    const id = req.params.id;

    Contact.findByIdAndUpdate(id,{contactName:contactName,email:email,contacted:contacted})
           .then(contact => {
               updateContact = {
                _id: contact._id,
                contactName: contact.contactName,
                email: contact.email,
                contacted: contact.contacted,
               }
               return res.status(200).json(updateContact)
            })
           .catch(error => res.status(404).send(error));
}

const allCompleted = (req,res) => {
    const user = req.user.usuario.userName;
    const contacted = req.body.contacted;
    console.log(contacted);

    Contact.updateMany({user:user},{contacted:contacted})
           .then(doc => res.status(200).send('All contacts modify success'))

}

const deleteContact = (req,res) => {
    const id = req.params.id;
    const user = req.user.usuario.userName;

    Contact.findOneAndDelete({_id:id})
           .then(contact => {
                User.findOne({userName:user})
                .then(user => {
                    console.log(user);
                    user.contactsId = user.contactsId.filter(contactId => contactId != String(id));
                    user.save();
                    return res.status(200).json(contact);
             });
           })
           .catch(error => {
               return res.status(404).send(error);
           })
}

const deleteAllContacts = (req,res) => {
    const user = req.user.usuario.userName;
    console.log('hola');

    Contact.deleteMany({user:user})
           .then(doc => {
                User.findOne({userName:user})
                .then(user => {
                    console.log(user);
                    user.contactsId = [];
                    user.save();
                    return res.status(200).json(doc);
                });
           })
           .catch(rerror => res.status(404).send(error));
}

const deleteInContacts = (userToDelete) => {

    Contact.deleteMany({user:userToDelete})
           .then(doc => {
               return true;
           })
           .catch(rerror => false);

}

module.exports = {
    createContact,
    getContact,
    getAllContacts,
    deleteContact,
    deleteAllContacts,
    deleteInContacts,
    patchAContact,
    allCompleted
}