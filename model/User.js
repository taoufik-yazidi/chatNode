const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({

    Lname: {
        type: String,
        require: true
    },
    Fname: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'email non valid'
        }
    },
    password: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean,
        required: true
    },
    activationKey: {
        type: String,
        require: true
    },
    tokens: [{
        access: {
            type: String,
            require: true

        },
        token: {
            type: String,
            require: true
        }

    }]
});
UserSchema.methods.genereateToken = function() {
    var user = this;
    var access = "user";
    var token = jwt.sign({ id: user._id.toHexString(), access: access }, 'zoro').toString();
    user.tokens.push({ access, token });
    return user.save()
        .then(() => {
            return token;
        })
        .catch();
}
UserSchema.methods.toJson = function() {
    var user = this;

    return { "Lname": user.Lname, "Fname": user.Fname };

}
UserSchema.statics.findUserByToken = function(token) {
    var User = this
    var decoded;
    console.log(token);
    try {
        decoded = jwt.verify(token, 'zoro');
        //  console.log(decoded);
    } catch (e) {
        console.log(e);
    }
    //  console.log(decoded);
    return User.findOne({
        _id: decoded.id
    })
}
UserSchema.statics.auth = function(email, password) {
    var User = this;

    return new Promise((resolve, reject) => {
        User.findOne({ email })
            .then((user) => {
                if (!user) {
                    console.log('hi im here');
                    return reject();
                }
                return bcrypt.compare(password, user.password, (err, resp) => {
                    if (resp) {
                        console.log('password valid');
                        return resolve(user);
                    } else {
                        console.log('invalid passowrd');
                        return reject()
                    }

                })

            })
            .catch();
    })



}


var User = mongoose.model('User', UserSchema);
module.exports = User;