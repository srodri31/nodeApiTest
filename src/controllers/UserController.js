const User = require('../models/User');

// Select *
let findAll = (req, res) => {
    User.findAll().then(users => {
        res.status(200).send(users);
    })
    .catch(err => {
        res.status(500).send(`Unable to retrieve records: ${err.message}`);
    });
}

//  Select * alternate version with async await
// async function findAll(req, res) {
//     try {
//         let users = await User.findAll();
//         res.status(200).send(users);
//     } catch (e) {
//         res.status(500).send(`Unable to retrieve records: ${e.message}`);
//     }
// }

async function findByID(req, res) {
    try {
        let result = await User.findOne({
            where: {
                id: req.params.id
            }
        });
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
let create = (req, res) => {
    let newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    return User.create(newUser).then(user => {
        console.log(`${user.firstname}'s auto-generated ID: ${user.id}`);
        res.status(200).send(user);
    })
    .catch(err => {
        res.status(500).send(`Unable to create user: ${err.message}`);
    });
}

// Update
let update = (req, res) => {
    let toUpdateUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    return User.update(toUpdateUser, {
        where: {
          id: req.params.id 
        }
    }).then((updated) => {
        if(updated) {
            res.status(200).send(`Done updating user`);
        } else {
            res.status(404).send(`Unable to update user: User not found`);
        }
    })
    .catch(err => {
        res.status(500).send(`Unable to update user: ${err}`);
    });
}

//delete
let destroy = (req, res) => {
    return User.destroy({
        where: {
            id: req.params.id 
        }
    }).then((deleted) => {
        if(deleted) {
            console.log("yes");
            res.status(200).send("Done destroying user");
        } else {
            console.log("No");
            res.status(404).send(`Unable to destroy user: User not found`);
        }
    })
    .catch(err => {
        res.status(500).send(`Unable to destroy user: ${err}`);
    });
}

module.exports = {
    findAll,
    findByID,
    create,
    update,
    destroy
}