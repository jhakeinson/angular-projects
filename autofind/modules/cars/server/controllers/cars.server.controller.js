'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Car = mongoose.model('Car'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an car
 */
exports.create = function (req, res) {
  var car = new Car(req.body);
  car.user = req.user;

  car.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};

/**
 * Show the current car
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var car = req.car ? req.car.toJSON() : {};

  // Add a custom field to the Car, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Car model.
  car.isCurrentUserOwner = !!(req.user && car.user && car.user._id.toString() === req.user._id.toString());

  res.json(car);
};

/**
 * Update a car
 */
exports.update = function (req, res) {
  var car = req.car;

  car.title = req.body.title;
  car.type = req.body.type;
  car.make = req.body.make;
  car.model = req.body.model;
  car.year = req.body.year;
  car.price = req.body.price;
  car.state = req.body.state;
  car.image_url = req.body.image_url;
  car.contact_email = req.body.contact_email;
  car.description = req.body.description;

  car.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};

/**
 * Delete an car
 */
exports.delete = function (req, res) {
  var car = req.car;

  car.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};

/**
 * List of Cars
 */
exports.list = function (req, res) {
  Car.find(req.query).sort('-created').populate('user', 'displayName').exec(function (err, cars) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cars);
    }
  });
};

exports.search = function() {
  console.log('searcing...');
}

/**
 * Car middleware
 */
exports.carByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Car is invalid'
    });
  }

  Car.findById(id).populate('user', 'displayName').exec(function (err, car) {
    if (err) {
      return next(err);
    } else if (!car) {
      return res.status(404).send({
        message: 'No car with that identifier has been found'
      });
    }
    req.car = car;
    next();
  });
};
