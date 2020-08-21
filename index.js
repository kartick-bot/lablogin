const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const fs =  require('fs');
var firebase = require('firebase');
const PORT = process.env.PORT || 5000;

let uri = process.env.MONGOLAB_URI || process.env.MONGODB_URL ||
process.env.MONGOHQ_URL || ' mongodb+srv://cryspr:computerscience@cluster0.rvdoh.mongodb.net/crysprloginDatabase?retryWrites=true&w=majority';

var firebaseConfig = {
  apiKey: "AIzaSyAOT_xMtr9LeeNnrY1MnlK8zrH0HmbvOL8",
  authDomain: "cryspr-lab-login.firebaseapp.com",
  databaseURL: "https://cryspr-lab-login.firebaseio.com",
  projectId: "cryspr-lab-login",
  storageBucket: "cryspr-lab-login.appspot.com",
  messagingSenderId: "609284075612",
  appId: "1:609284075612:web:1fd25dcfaf18952d977699"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

express()
  .use(bodyParser.urlencoded({extended:false}))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/style.css', express.static(__dirname + '/public/style.css'))
  .post("/login",(req, res) =>{(async () => {
    let seedData={ "name": req.body.name,"aggie_ID": req.body.Aggie_ID, "checkin_date": req.body.checkin_date, "checkin_time": req.body.checkin_time, "checkout_date": req.body.checkout_date, "checkout_time": req.body.checkout_time }
    console.log('seed',seedData);
    try {
      await ( db.ref('cryspr-lab-login').push()).set({
        "name": req.body.name,"aggie_ID": req.body.Aggie_ID, "checkin_date": req.body.checkin_date, "checkin_time": req.body.checkin_time, "checkout_date": req.body.checkout_date, "checkout_time": req.body.checkout_time
      })
      return res.status(200).send('successs'); 
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
    // let data = JSON.stringify(req.body) +'\n';
    // console.log('uri',uri)
    //     try {
    //       let seedData={ "name": req.body.name,"aggie_ID": req.body.Aggie_ID, "checkin_date": req.body.checkin_date, "checkin_time": req.body.checkin_time, "checkout_date": req.body.checkout_date, "checkout_time": req.body.checkout_time }
    //       console.log('seed',seedData);
    //      await db.collection('login-user-details').doc('/' + Math.random + '/')
    //           .create({seedData});
    //       return res.status(200).send('successs');
    // } catch (error) {
    //     return res.send(JSON.stringify(error))

    // }
    
    
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
