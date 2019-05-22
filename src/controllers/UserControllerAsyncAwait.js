const Joi = require("@hapi/joi");
const { createSchema, updateSchema } = require("../utils/validationSchemas");
const User = require('../models/User');

//  Select *
async function findAll(req, res) {
    try {
        let users = await User.findAll();
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(`Unable to retrieve records: ${e.message}`);
    }
}

async function findByID(req, res) {
    try {
        let result = await User.findByPk(req.params.id);
        if(result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("User not found");
        }
    } catch(e) {
        res.status(500).send(`Unable to retrieve user: ${e.message}`);
    }
}

// Insert
async function create(req, res) {
    let newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    const validated = Joi.validate(newUser, createSchema);
    if(!validated.error) {
        try {
            let user = await User.create(newUser);
            console.log(`${user.firstname}'s auto-generated ID: ${user.id}`);
            res.status(200).send(user);
        } catch (err) {
            res.status(500).send(`Unable to create user: ${err.message}`);
        }   
    } else {
        res.status(400).send(`Unable to create user: ${validated.error.message}`);
    }
}

// Update
async function update(req, res) {
    let toUpdateUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    const validated = Joi.validate(toUpdateUser, updateSchema);
    if(!validated.error) {
        try {
            let updated = await User.update(toUpdateUser, {
                where: {
                    id: req.params.id 
                }
            });
            if(updated > 0) {
                res.status(200).send(`Done updating user`);
            } else {
                res.status(404).send(`Unable to update user: User not found`);
            }
        } catch(err) {
            res.status(500).send(`Unable to update user: ${err.message}`);
        }
    } else {
        res.status(400).send(`Unable to update user: ${validated.error.message}`);
    }
}

//delete
async function destroy(req, res) {
    try {
        let deleted = await User.destroy({
            where: {
                id: req.params.id 
            }
        });
        if(deleted) {
            console.log("yes");
            res.status(200).send("Done destroying user");
        } else {
            console.log("No");
            res.status(404).send(`Unable to destroy user: User not found`);
        }
    } catch (err) {
        res.status(500).send(`Unable to destroy user: ${err.message}`);
    }
}

module.exports = {
    findAll,
    findByID,
    create,
    update,
    destroy
}