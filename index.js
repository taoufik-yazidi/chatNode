const express = require('express');
const bodyParser = require('body-parser');
const routerUser = require('./routre/routeUser');
const routerInvitation = require('./routre/routreInvitation');
const routerMsg = require('./routre/routerMsg');
const routerChatRoom = require('./routre/routerChatRoom');
const mongoose = require('mongoose');

const app = express();
const http = require('http').createServer(app);
//var io = require('socket.io')(http);
const io = require('./socket').init(http);
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', '*');
    next();

})
app.use('/user', routerUser);
app.use('/invitation', routerInvitation);
app.use('/msg', routerMsg);
app.use('/messages', routerChatRoom);


mongoose.connect('mongodb+srv://taoufik-client:toutou1963@databaseproject-ixkaz.mongodb.net/chatRom?retryWrites=true')
    .then(result => {
        // console.log(result);
        /*
                io.on('connection', function(socket) {
                    console.log('an user connected');
                    // console.log(socket.req);

                    socket.on("test", data => {
                        console.log(data);
                        socket.emit("getMsg", "toto");
                    });
                });*/




        http.listen(3001, function() {
            console.log('listening on *:3001');

            io.on('connection', socket => {
                console.log('Client connected');
            });
        });


    })

.catch(err => {
    console.log('hiiiii');
    console.log(err);
});