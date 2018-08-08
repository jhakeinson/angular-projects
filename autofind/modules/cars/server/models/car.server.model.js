'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * Car Schema
 */
var CarSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: 'New car',
    trim: true,
    required: 'Title cannot be blank'
  },
  type: {
    type: String,
    default: 'used',
    trim: true,
    required: 'Type cannot be blank'
  },
   make: {
    type: String,
    default: '',
    required: true,
    trim: true
  },
  model: {
    type: String,
    default: '',
    required: true,
    trim: true
  },
  state: {
    type: String,
    default: '',
    trim: true
  },
  year: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  contact_email: {
    type: String,
    default: '',
    trim: true
  },
  image_url: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

CarSchema.statics.seed = seed;

mongoose.model('Car', CarSchema);

/**
* Seeds the User collection with document (Car)
* and provided options.
*/
function seed(doc, options) {
  var Car = mongoose.model('Car');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(findAdminUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin'] }
          })
          .exec(function (err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Car
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Car (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Car\t' + doc.title + ' skipped')
          });
        }

        var car = new Car(doc);

        car.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Car\t' + car.title + ' added'
          });
        });
      });
    }
  });
}
