var express = require('express');
const { db } = require('../models/Subscriber');
var router = express.Router();
var Subscriber = require('../models/Subscriber');
// Get all Subscribers
router.get("/", function (req, res, next) {
    Subscriber.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Subscriber by ID
router.get('/:id', function(req, res, next) {
    Subscriber.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Subscriber 
router.post('/', async function(req,res,next){
    const SubscriberObject = JSON.parse(JSON.stringify(req.body))
    const subscriber = new Subscriber({
        ...SubscriberObject
    }); 

    subscriber.save()
      .then(() => res.send(req.body))
        .catch(err => res.status(400).json({ error: err }))
  });

  // Add JSON 
  router.post('/addJSON', function(req, res) {
    // Insert JSON straight into MongoDB
    Subscriber.insertMany(req.body, function (err, result) {
        if (err)
          res.send('Error');
        else
          res.send(req.body);
    });
  });

// Modify Subscriber
router.put('/:id', async function (req, res, next) {

    Subscriber.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.send(req.body))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Subscriber  
router.delete('/:id',function(req, res, next) {
    Subscriber.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Subscriber with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete all
router.delete("/", function(req, res, next){
  Subscriber.deleteMany()
  .then(() => res.status(200).json({msg: "All subscribers deleted"}))
  .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
