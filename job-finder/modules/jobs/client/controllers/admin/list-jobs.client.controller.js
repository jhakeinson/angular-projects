(function () {
  'use strict';

  angular
    .module('jobs.admin')
    .controller('jobsAdminListController', jobsAdminListController);

  jobsAdminListController.$inject = ['jobsService'];

  function jobsAdminListController(jobsService) {
    var vm = this;

    vm.jobs = jobsService.query();
  }
}());
