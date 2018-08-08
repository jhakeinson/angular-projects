(function () {
  'use strict';

  angular
    .module('jobs.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('jobs', {
        abstract: true,
        url: '/jobs',
        template: '<ui-view/>'
      })
      .state('jobs.list', {
        url: '',
        templateUrl: '/modules/jobs/client/views/list-jobs.client.view.html',
        controller: 'jobsListController',
        controllerAs: 'vm'
      })
      .state('jobs.view', {
        url: '/:jobId',
        templateUrl: '/modules/jobs/client/views/view-job.client.view.html',
        controller: 'jobsController',
        controllerAs: 'vm',
        resolve: {
          jobResolve: getjob
        },
        data: {
          pageTitle: '{{ jobResolve.title }}'
        }
      });
  }

  getjob.$inject = ['$stateParams', 'jobsService'];

  function getjob($stateParams, jobsService) {
    return jobsService.get({
      jobId: $stateParams.jobId
    }).$promise;
  }
}());
