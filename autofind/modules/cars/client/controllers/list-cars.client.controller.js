(function () {
  'use strict';

  angular
    .module('cars')
    .controller('CarsListController', CarsListController);

  CarsListController.$inject = ['CarsService', '$stateParams'];

  function CarsListController(CarsService, $stateParams) {
    var vm = this;

    var query = {};

    if($stateParams.query.type) {
      console.log($stateParams.query.type);
      query.type = $stateParams.query.type;
    }
    if($stateParams.query.make) {
      console.log($stateParams.query.make);
      query.make = $stateParams.query.make;
    }
    if($stateParams.query.model) {
      console.log($stateParams.query.model);
      query.model = $stateParams.query.model;
    }
    if($stateParams.query.state) {
      console.log($stateParams.query.state);
      query.state = $stateParams.query.state;
    }

    console.log(query);

    vm.cars = CarsService.query(query);
  }
}());
