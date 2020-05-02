const Chat = require('../model/chatRoom');
const User = require('../model/User');
const mongoose = require('mongoose');

exports.createChatRoom = (usersId, inviId) => {

    // console.log("ahhahaahhaha" + usersId);
    var nameRoom = "";
    usersId.forEach(element => {
        nameRoom = nameRoom + "," + element.name;
        console.log('rooooooom' + nameRoom)

    });
    Chat.findOne({
        'invitationId': mongoose.Types.ObjectId(inviId)
    }).then(
        Room => {

            if (Room === null) {
                chat = new Chat();
                chat.invitationId = mongoose.Types.ObjectId(inviId);
                chat.memberRoom.users = Chat.toJsonChat(usersId);
                chat.nameRoom = nameRoom;
                Chat.saveChatRoom(chat);
            } else {
                Room.memberRoom.users.push(usersId[1])
                Chat.saveChatRoom(Room);
            }
        }
    )


}
exports.findAllChatRoomByIdUser = (req, res, next) => {


    var token = req.header('x-auth');
    User.findUserByToken(token)
        //  .populate('users')
        .then((user) => {
            // console.log('hiihii');
            //console.log(user);
            console.log('user***********' + user)
            Chat.find({
                    'memberRoom.users.userId': user._id
                })
                .populate()
                .then(
                    resp => {
                        console.log(resp)
                        var chatRoom = [];
                        resp.forEach(res => {
                            chatRoom.push({ idChat: res._id, name: res.nameRoom })
                        })
                        res.status(201).send({ 'chatRoom': chatRoom });

                    }
                )


        })
        .catch();

}