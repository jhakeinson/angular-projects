(function () {
  'use strict';

  angular
    .module('jobs.admin')
    .controller('jobsAdminController', jobsAdminController);

  jobsAdminController.$inject = ['$scope', '$state', '$window', 'jobResolve', 'Authentication', 'Notification'];

  function jobsAdminController($scope, $state, $window, job, Authentication, Notification) {
    var vm = this;

    vm.job = job;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing job
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.job.$remove(function () {
          $state.go('admin.jobs.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> job deleted successfully!' });
        });
      }
    }

    // Save job
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.jobForm');
        return false;
      }

      // Create a new job, or update the current instance
      vm.job.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.jobs.list'); // should we send the User to the list or the updated job's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> job saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> job save error!' });
      }
    }
  }
}());
