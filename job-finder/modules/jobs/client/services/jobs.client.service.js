(function () {
  'use strict';

  angular
    .module('jobs.services')
    .factory('JobsService', JobsService);

  JobsService.$inject = ['$resource', '$log'];

  function JobsService($resource, $log) {
    var job = $resource('/api/jobs/:jobId', {
      jobId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(job.prototype, {
      createOrUpdate: function () {
        var job = this;
        return createOrUpdate(job);
      }
    });

    return job;

    function createOrUpdate(job) {
      if (job._id) {
        return job.$update(onSuccess, onError);
      } else {
        return job.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(job) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
