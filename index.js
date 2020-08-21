const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const fs =  require('fs');
const { assert } = require('console');
const PORT = process.env.PORT || 5000;

let uri = process.env.MONGOLAB_URI || process.env.MONGODB_URL ||
process.env.MONGOHQ_URL || ' mongodb+srv://cryspr:computerscience@cluster0.rvdoh.mongodb.net/crysprloginDatabase?retryWrites=true&w=majority';

express()
  .use(bodyParser.urlencoded({extended:false}))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/style.css', express.static(__dirname + '/public/style.css'))
  .post("/login",(req, res) =>{
    let data = JSON.stringify(req.body) +'\n';
    console.log('uri',uri)
        try {
          mongoose.connect(uri,{ useNewUrlParser: true }, function(err, client) {
           // assert.equal(null,err);
            if(err) throw err;
          // console.log('client',client)
            /*
             * Get the database from the client. Nothing is required to create a
             * new database, it is created automatically when we insert.
             */
          
            // let db = client.db('crysprloginDatabase')
          
            // /*
            //  * First we'll add a few logindetails. Nothing is required to create the
            //  * logindetails collection; it is created automatically when we insert.
            //  */
          
             let logindetails = client.collection('logintable');
            // console.log('logindetails',logindetails)
            //  // Note that the insert method can take either an array or a dict.
             let seedData=new mongoose.Schema({ "name": req.body.name,"Aggie_ID": req.body.Aggie_ID, "checkin_date": req.body.checkin_date, "checkin_time": req.body.checkin_time, "checkout_date": req.body.checkout_date, "checkout_time": req.body.checkout_time })
             console.log('seed',seedData)
             logindetails.insertOne(seedData, function(err, result) {
              //assert.equal(null,err);
              console.log('result',result)
              if(err) throw err;
              
          setTimeout(() => {
            client.close(function (err) {
              if(err) throw err;
            });  
          }, 1000);
              
            });
          });
          return res.send(JSON.stringify("success"))
    } catch (error) {
        return res.send(JSON.stringify(error))

    }
    
    
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
