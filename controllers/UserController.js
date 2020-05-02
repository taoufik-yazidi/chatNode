const User = require('../model/User');
const bcrypt = require('bcrypt');
const mail = require('./mailController');
const randomstring = require("randomstring");

exports.saveUser = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var key = randomstring.generate();

    console.log(email, password);

    bcrypt.hash(password, 12).then(passwordHashed => {
            const user = new User({
                email: email,
                password: passwordHashed,
                Lname: Lname,
                Fname: Fname,
                active: false,
                activationKey: key
            });
            user.save()
                .then(() => {
                    mail.sendMail(user.email, key);
                    return user.genereateToken();
                }).then(
                    (token) => {
                        res.header('auth', token).send(user.toJson())
                    }
                ).catch(err => {
                    res.status(400).json('email invalid')
                })
        })
        .catch(err => {
            res.status(500).json()
        });



}

exports.findMe = (req, res, next) => {
    var token = req.header('x-auth');
    // console.log(token);
    User.findUserByToken(token)
        .then((user) => {
            console.log(user);
            res.send(user);
        })
        .catch();
}
exports.login = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    User.auth(email, password).then((user) => {
        user.genereateToken().then((token) => {
            res.header('x-auth', token).send(user.toJson());
        })

        console.log('1');

    }).catch((err) => {
        console.log('2');
        res.status(404).send({ msg: 'invalide password or email' });
    })
}
exports.activeAccount = (req, res, next) => {

    var key = req.body.key;
    var token = req.header('x-auth');
    User.findUserByToken(token)
        .then((user) => {
            //console.log(key)
            console.log(user);

            if (user.activationKey === key) {
                user.active = true;
                user.save().then(
                    res.send({ msg: ' your account is actived' })
                ).catch();
            } else {
                res.send({ msg: "key invalid" });
            }

            //  res.send(user);
        })
        .catch();

}
exports.findAllUser = (req, res, next) => {
    User.find()
        .then(
            (users) => {
                res.status(201).send({ users });
            }
        )
        .catch();
}
exports.findUserByName = (req, res, next) => {
    var name = req.body.name;
    User.find({ Fname: name })
        .then(
            (users) => {
                res.status(201).send({ users })
            }
        )
        .catch(

        );
}
exports.findUserById = (req, res, next) => {
    var idEmitteur = req.body.idEmitteur
    User.findById(idEmitteur)
        .then(user => {
            res.status(201).send({ Fname: user.Fname, Lname: user.Lname })
        })
        .catch()
}