const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idusers = require('../controllers/invitationController');
const ChatSchema = new Schema({

    nameRoom: {
        type: String,

    },

    invitationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invitation',
        required: true
    },
    memberRoom: {
        users: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                require: true
            }
        }]
    }

    ,


    msgs: [{
        msg: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Msg'
        }
    }]

});

/*ChatSchema.statics.findChatByIdUser = function(usersId) {

        const chat = new Chat();
        var ids = [];
        idusers.tab.forEach(element => {
            ids.push({ userId: mongoose.Types.ObjectId(element) });
            // chat.memberRoom.users.push(mongoose.Types.ObjectId(element));
            // console.log(chat);
        });

        /*   console.log(ids);
           chat.save({ $push: { users: ids } });
           console.log(chat);*/

/*  chat.memberRoom.users.push(ids[1]);
        console.log(chat);
        chat.save(done);
}*/
//module.exports = mongoose.model('Chat', ChatSchema);

ChatSchema.statics.saveChatRoom = function(chat) {
    console.log('hiiii save chatRoom' + chat);
    chat.save()
        .then(chat => {
            console.log(chat);

        })
        .catch();
}
ChatSchema.statics.toJsonChat = function(usersId) {

    var Users = [];
    const user = [];
    Users = usersId;
    Users.forEach(element => {
        console.log(element);
        user.push({ userId: mongoose.Types.ObjectId(element.id) });

    });
    console.log(user)
    return user;
    // console.log(usersId);

}

var Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;