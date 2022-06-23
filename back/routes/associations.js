var express = require('express');
var router = express.Router();
var Association = require('../models/Association');
var { SendEmaill } = require("../mail/mailer");

// Get all Associations
router.get("/", function (req, res, next) {
    Association.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Association by ID
router.get('/:id', function(req, res, next) {
    Association.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Association 
router.post('/', async function(req,res,next){
    const AssociationObject = JSON.parse(JSON.stringify(req.body))
    const association = new Association({
        ...AssociationObject
    }); 

    Association.create(association).then((d) => {
      (ids = d._id), console.log(ids);

    res.send(
      {
        _id: d._id,
        ...req.body
      }
    );      
    });
  });

// Modify Association
router.put('/:id', async function (req, res, next) {

    Association.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.send(req.body))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Association  
router.delete('/:id',function(req, res, next) {
    Association.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Association with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

router.post('/confirmRequest', function(req, res, next){
  console.log(req.body)
  try {
    SendEmaill(req.body.Email)
    res.status(200).send('success') 
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

module.exports = router;
