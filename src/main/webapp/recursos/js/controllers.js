'use strict';

/* Controllers */

var app = angular.module('app.controllers', []);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

app.controller('inicio_ctrl', function ($scope) {
	$scope.nombre = "Javier";
});

app.controller('menu_ctrl', function ($scope,  MenuFactory, PortalService, ServiciosGlobales, $location) {
	$scope.portal = false;
	$scope.portales = PortalService.query();
	
	$scope.portalSeleccionado = function() {
		return $scope.portal;
	}
	
	$scope.portalElegir = function(portal) {
		$scope.portal = true;
		$scope.modulos = MenuFactory.findPortalMenu({idPortal : portal.id});
		$location.path(portal.url.substring(1));
		ServiciosGlobales.PORTAL_URL = portal.url;
	}
});