(function () {
  'use strict';

  angular
    .module('jobs')
    .controller('jobsListController', jobsListController);

  jobsListController.$inject = ['JobsService'];

  function jobsListController(JobsService) {
    var vm = this;

    vm.jobs = JobsService.query();
  }
}());
