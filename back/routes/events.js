var express = require('express');
var router = express.Router();
var Event = require('../models/Event');

// Get all Events
router.get("/", function (req, res, next) {
    Event.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Event by ID
router.get('/:id', function(req, res, next) {
    Event.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Event 
router.post('/', async function(req,res,next){
    const EventObject = JSON.parse(JSON.stringify(req.body))
    const event = new Event({
        ...EventObject
    }); 

    event.save()
      .then(() => res.send(req.body))
        .catch(err => res.status(400).json({ error: err }))
  });

// Modify Event
router.put('/:id', async function (req, res, next) {

    Event.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.send(req.body))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Event  
router.delete('/:id',function(req, res, next) {
    Event.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Event with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
