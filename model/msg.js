const monogoose = require('mongoose');
const Schema = monogoose.Schema;

const schemaMsg = new Schema({


    idUserEmit: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    idChatRoom: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },

    date: {
        type: Date,
        require: true

    },
    bodyMsg: {
        type: String,
        required: true

    }




});
module.exports = monogoose.model('Msg', schemaMsg);