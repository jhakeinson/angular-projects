(function () {
  'use strict';

  angular
    .module('jobs')
    .controller('jobsController', jobsController);

  jobsController.$inject = ['$scope', 'jobResolve', 'Authentication'];

  function jobsController($scope, job, Authentication) {
    var vm = this;

    vm.job = job;
    vm.authentication = Authentication;

  }
}());
