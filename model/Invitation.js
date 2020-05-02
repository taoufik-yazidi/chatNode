const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InviSchema = new Schema({


    emetteurInvitation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nameEmetteur: {
        type: String,

    },
    recepteurInvitation: [{

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',

        },
        status: {
            type: Boolean,
            required: true
        }

    }],

});
InviSchema.statics.toJsonInvitation = function(recepteur) {
    //console.log(recepteur);
    const auxTab = [];
    recepteur.forEach(element => {
        console.log('********************************' + element);
        auxTab.push({ userId: element, status: false });
    });
    console.log('haahhahaahha' + auxTab)
    return auxTab;
}

var Invitation = mongoose.model('Invitation', InviSchema);
module.exports = Invitation;