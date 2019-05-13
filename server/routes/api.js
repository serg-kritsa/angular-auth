const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/event');
const EventSpecial = require('../models/event-special');
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://s:a@cluster0-basxu.mongodb.net/eventdb?retryWrites=true"
// const db = "mongodb://testuser:testpw@ds123136.mlab.com:23136/eventsdb";
// const db = "mongodb://localhost:27017/eventsdb";
// mongoose.Promise = global.Promise;

// mongoose.connect(db, function(err){  
//   if(err){
//     console.error('Error! ' + err);
//   } else {
//     console.log('Connected to mongodb');
    
//     require('../models/loadDemoData')();
  
// // const event = new Event({
// //   // "_id": "6",
// //   "name": "Auto Expo",
// //   "description": "lorem ipsum",
// //   "date": "2012-04-23T18:25:43.511Z"
// // })
// // event.save((err, doc) => console.log('saved ') )
//   }
// });

mongoose.connect(db, { useNewUrlParser: true } )
  .then( _ => {
    console.log('Connected to mongodb');
    require('../models/loadDemoData')();      
  })
  .catch( err => console.error(err))

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
// https://mongoosejs.com/docs/queries.html
router.get('/events', (req,res) => {
  Event.find((err, docs) => {
    // console.log('!!!', events);    
    if (err) {
      console.log(err)    
    } else {
      if (!docs) {
        res.status(401).send('No events')
      } else {        
        // res.status(200).send(users) 
        // let events = 
        res.json(docs)
      }
    }
  })
})

router.get('/special', verifyToken, (req, res) => {
  EventSpecial.find((err, docs) => {
    // console.log('!!!@@@', docs);    
    if (err) {
      console.log(err)    
    } else {
      if (!docs) {
        res.status(401).send('No special events')
      } else {        
        // res.status(200).send(users) 
        // let events = 
        res.json(docs)
      }
    }
  })
  // res.json(specialEvents)
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

module.exports = router;