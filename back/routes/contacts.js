var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact');

// Get all Contacts
router.get("/", function (req, res, next) {
    Contact.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Contact by ID
router.get('/:id', function(req, res, next) {
    Contact.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Contact 
router.post('/', async function(req,res,next){
    const contactObject = JSON.parse(JSON.stringify(req.body))
    const contact = new Contact({
        ...contactObject
    }); 

      contact.save()
      .then(() => res.send(req.body))
        .catch(err => res.status(400).json({ error: err }))
  });

// Modify Contact
router.put('/:id', async function (req, res, next) {

    Contact.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.send(req.body))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Contact  
router.delete('/:id',function(req, res, next) {
    Contact.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Contact with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
