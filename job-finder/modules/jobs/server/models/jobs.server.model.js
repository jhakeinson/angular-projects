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
 * job Schema
 */
var JobSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  company: {
    type: String,
    default: '',
    trim: true,
    required: 'Company cannot be blank'
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  requirements: {
    type: String,
    default: '',
    trim: true
  },
  hourly_wage: {
    type: Number,
    default: 0,
    trim: true
  },
  state: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

JobSchema.statics.seed = seed;

mongoose.model('Job', JobSchema);

/**
* Seeds the User collection with document (job)
* and provided options.
*/
function seed(doc, options) {
  var Job = mongoose.model('Job');

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
        Job
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

            // Remove job (overwrite)

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
            message: chalk.yellow('Database Seeding: Job\t' + doc.title + ' skipped')
          });
        }

        var job = new Job(doc);

        job.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Job\t' + job.title + ' added'
          });
        });
      });
    }
  });
}
