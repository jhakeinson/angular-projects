(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['CarsService', '$state'];

  function HomeController(CarsService, $state) {
    var vm = this;
    vm.search = function() {
      $state.go('cars.search', {query: vm.car});
    };

    vm.cars = CarsService.query();
  }
}());
