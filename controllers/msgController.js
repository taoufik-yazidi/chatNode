  const Msg = require('../model/msg');
  const User = require('../model/User');
  const Invi = require('../model/Invitation');
  const socket = require('../socket');
  exports.sendMsg = (req, res, next) => {

      var idChat = req.body.idChat;
      var bodyMsg = req.body.bodyMsg;
      var token = req.header('x-auth');
      // console.log(token);
      User.findUserByToken(token)
          .then((user) => {
              console.log(user);
              const msg = new Msg({ idUserEmit: user.id, idChatRoom: idChat, date: new Date(), bodyMsg: bodyMsg })
              msg.save().then(
                  msg => {
                      socket.getIO().emit("getMsg", msg.bodyMsg);
                      res.status(201).send('msg saved');
                  }

              )
          })
          .catch();


  }
  exports.getAllMsgInChat = (req, res, next) => {

      var idChat = req.body.idChat;

      var token = req.header('x-auth');
      // console.log(token);
      User.findUserByToken(token)
          .then((user) => {
              // console.log(user);
              Invi.findOne({ _id: user._id })
                  .then(
                      Msg.find({
                          idChatRoom: idChat
                      }).then(
                          (msgs) => {

                              res.status(201).send(msgs)
                          }
                      )

                  )
                  .catch(err => { res.status(404).send('bad request 400') })


          })
          .catch();

  }