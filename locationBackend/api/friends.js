var express = require("express");
var router = express.Router();
var connection = require("../config/database");
var friend = require('../model/friend');

router.post("/friends/:distance", function (req, res) {
  var user = JSON.parse(req.body); //forkert objekt
  var distance = req.params.distance;
  var coord = user.coordinates;
 // friend.find({ loc: { $geoWithin: { $centerSphere: [coord, distance] } } }, function (err, friendsWithin) {
    //if (err) throw err;
    friend.create(user, function (err) {
      if (err) throw err;
      res.json(friendsWithin);
    })
 // })


})



module.exports = router;