const Contact = require('../models/contact');

const getContacts = (req, res) => {
    Contact.find()
        .then((contacts) => res.status(201).json(contacts))
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    getContacts,
};
