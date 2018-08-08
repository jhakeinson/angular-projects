(function () {
  'use strict';

  angular
    .module('cars.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cars', {
        abstract: true,
        url: '/cars',
        template: '<ui-view/>'
      })
      .state('cars.list', {
        url: '',
        templateUrl: '/modules/cars/client/views/list-cars.client.view.html',
        controller: 'CarsListController',
        controllerAs: 'vm'
      })
      .state('cars.search', {
        url: '/search',
        templateUrl: '/modules/cars/client/views/search-cars.client.view.html',
        controller: 'CarsListController',
        controllerAs: 'vm',
        params: {
          query: null
        }
      })
      .state('cars.create', {
        url: '/create',
        templateUrl: '/modules/cars/client/views/admin/form-car.client.view.html',
        controller: 'CarsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        },
        resolve: {
          carResolve: newCar
        }
      })
      .state('cars.view', {
        url: '/:carId',
        templateUrl: '/modules/cars/client/views/view-car.client.view.html',
        controller: 'CarsAdminController',
        controllerAs: 'vm',
        resolve: {
          carResolve: getCar
        },
        data: {
          pageTitle: '{{ carResolve.title }}'
        }
      })
      .state('cars.edit', {
        url: '/:carId/edit',
        templateUrl: '/modules/cars/client/views/admin/form-car.client.view.html',
        controller: 'CarsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['user'],
          pageTitle: '{{ carResolve.title }}'
        },
        resolve: {
          carResolve: getCar
        }
      });
  }

  getCar.$inject = ['$stateParams', 'CarsService'];

  function getCar($stateParams, CarsService) {
    return CarsService.get({
      carId: $stateParams.carId
    }).$promise;
  }

  newCar.$inject = ['CarsService'];

  function newCar(CarsService) {
    return new CarsService();
  }
}());
