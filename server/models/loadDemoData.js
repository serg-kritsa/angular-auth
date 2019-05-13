const mongoose = require('mongoose');
const Event = require('./event');
const EventSpecial = require('./event-special');

let events = [
    {
      // "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      // "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      // "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      // "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      // "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      // "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
]
let specialEvents = [
    {
    //   "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
    //   "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
    //   "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
    //   "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
    //   "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
    //   "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
]

module.exports = function(){
    mongoose.connection.db.collection('events').countDocuments().then(res => {
        if(res==0){
            Event.insertMany(events, err => { 
            if(err) 
            console.log(err); 
            else 
            console.log(events.length, 'тестовых записей добавлено'); 
            })
        }
    });

    mongoose.connection.db.collection('specialevents').countDocuments().then(res => {
        // console.log('!!!', res);        
        if(res==0){
            EventSpecial.insertMany(specialEvents, err => { 
            if(err)
                console.log(err); 
            else
                console.log(specialEvents.length, 'тестовых записей добавлено'); 
            })
        }
    });
}