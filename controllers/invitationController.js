const Invi = require('../model/Invitation');
const User = require('../model/User');
const chat = new require('./ChatRoomController');
const mongoose = require('mongoose');

exports.invite = (req, res, next) => {
    var recepteur = [] = req.body.ids;
    // console.log(recepteur);
    var token = req.header('x-auth');
    User.findUserByToken(token)
        .then((user) => {
            // console.log(user);
            const invi = new Invi({ emetteurInvitation: user._id, nameEmetteur: user.Fname + user.Lname });
            invi.recepteurInvitation = Invi.toJsonInvitation(recepteur);
            // console.log(Invi.toJsonInvitation(recepteur))
            // console.log('aaaaaaaaaaaaaaaaaaaaaaaaa3' + invi);


            console.log('INVI----------------------' + invi)
            invi.save()
                .then(
                    res.status(201).send({ "msg": "invitation confirmee" })
                )
        })
        .catch();

}
exports.invitationReceived = (req, res, next) => {
    var token = req.header('x-auth');
    User.findUserByToken(token)
        .then((user) => {
            console.log(user);
            Invi.find({
                    'recepteurInvitation.userId': user.id,
                    'recepteurInvitation.status': false
                })
                .then(invitations => {
                    res.status(201).send({ invitations });
                })
        })
        .catch();

}
const idUsers = [];
exports.acceptInvitation = (req, res, next) => {
    var idInvi = req.body.idInvi;

    var token = req.header('x-auth');
    User.findUserByToken(token)
        .then((user) => {
            // console.log(user);
            Invi.findOne({
                    _id: idInvi,
                    'recepteurInvitation.userId': user.id
                })
                .then((invitation) => {
                    invitation.status = true;
                    invitation.save()
                        .then(
                            // console.log(invitation.emetteurInvition),
                            // console.log(invitation.recepteurInvitation),

                            idUsers.push({ id: invitation.emetteurInvitation, name: invitation.nameEmetteur }),
                            idUsers.push({ id: user._id, name: user.Fname }),
                            chat.createChatRoom(idUsers, invitation._id),
                            res.status(201).send({ msg: 'invitation accept' })
                        )



                })
        })
        .catch();

}
exports.tab = idUsers;