(function () {
  'use strict';

  angular
    .module('jobs.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.jobs', {
        abstract: true,
        url: '/jobs',
        template: '<ui-view/>'
      })
      .state('admin.jobs.list', {
        url: '',
        templateUrl: '/modules/jobs/client/views/admin/list-jobs.client.view.html',
        controller: 'jobsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.jobs.create', {
        url: '/create',
        templateUrl: '/modules/jobs/client/views/admin/form-job.client.view.html',
        controller: 'jobsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          jobResolve: newJob
        }
      })
      .state('admin.jobs.edit', {
        url: '/:jobId/edit',
        templateUrl: '/modules/jobs/client/views/admin/form-job.client.view.html',
        controller: 'jobsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ jobResolve.title }}'
        },
        resolve: {
          jobResolve: getjob
        }
      });
  }

  getjob.$inject = ['$stateParams', 'JobsService'];

  function getjob($stateParams, JobsService) {
    return JobsService.get({
      jobId: $stateParams.jobId
    }).$promise;
  }

  newJob.$inject = ['JobsService'];

  function newJob(JobsService) {
    return new JobsService();
  }
}());
