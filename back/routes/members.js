var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var User = require('../models/User');
var bcrypt = require("bcrypt");
var multer = require("multer");

var Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  var upload = multer({
    storage: Storage,
  }).single("file");

// Get all Members
router.get("/", function (req, res, next) {
    Member.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Member by ID
router.get('/:id', function(req, res, next) {
    Member.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Member    
router.post("/", upload, async function (req, res, next) {
    const obj = JSON.parse(JSON.stringify(req.body));
  
    const hashedPassword = await bcrypt.hash(obj.Password, 10);
    const member = {
      FirstName: obj.FirstName,
      LastName: obj.LastName,
      Picture: obj.Picture,
      DOB: obj.DOB,
      Phone: obj.Phone,
      Adress: obj.Adress,
      Role_Association: obj.Role_Association,
    };
    var ids;
  
    //console.log(mynewdelivery);
  
    Member.create(member).then((d) => {
      (ids = d._id), console.log(ids);
      User.create({
        _id: d._id,
        Password: hashedPassword,
        Email: obj.Email,
        Role: obj.Role,
      });
    });
    res.send(req.body);
  });

// Modify Member
router.put('/:id', async function (req, res, next) {
    const mail = {
      Email: req.body.Email,
    };
    Member.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(User.findByIdAndUpdate(req.params.id, mail, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send(res.req.body)
      }
    }))
    .catch(err => res.status(400).json({ error: err }))
})



//Delete Member  
router.delete('/:id',function(req, res, next) {
    Member.deleteOne({ _id: req.params.id })
    .then((User.findByIdAndDelete(req.params.id, function (err){
      if (err){
        console.log(err)
      } else{
        res.status(200).json({ msg: `Member with id : ${req.params.id} has been removed` })
      }
    })) )
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;

