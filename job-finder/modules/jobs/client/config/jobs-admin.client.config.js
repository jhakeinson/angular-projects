(function () {
  'use strict';

  // Configuring the jobs Admin module
  angular
    .module('jobs.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage jobs',
      state: 'admin.jobs.list'
    });
  }
}());
