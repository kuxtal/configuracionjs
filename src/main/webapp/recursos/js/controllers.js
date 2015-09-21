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

app.controller('menu_ctrl', function ($scope,  MenuFactory, PortalesFactory, ServiciosGlobales, $location) {
	$scope.portal = false;
	$scope.portales = PortalesFactory.query();
	
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


app.controller('autenticacion_ctrl', function ($scope, $routeParams, $http, $location, ServiciosGlobales) {
	$scope.login = function(){
		var url = ServiciosGlobales.SSO_URL + '/resources/j_spring_security_check';
		url = url.replace(/\\:/g, ':');
		
		var data = $.param({j_username: $scope.username, j_password: $scope.password});
		$http.post(url, data, {
			  headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			    'Accept' : 'text/plain'
			  }
		}).
	    success(function(data, status, headers, config) {
	    	$scope.location = headers('Location');
	    	
	    	console.info("You're now logged in, welcome "+$scope.username);
	    	console.info("Location: "+ $scope.location);
	    	jQuery('#userLogin').hide();
			jQuery('#userInfo').show();

			var data = $.param({service : 'https://applocal/roo_rest'});
			$http.post($scope.location, data, { 
		          headers: {
		        	  'Content-Type': 'application/x-www-form-urlencoded',
		        	  'Accept' : 'text/plain'
		          } 
			}).success(function(data, status, headers, config) {
				var ticket = $.param({'ticket': data});
				console.info("Success Ticket");
			}).error(function(error){
				console.error("Login fallido " + error);
	        	console.info($scope.setErrorMessage);
			});
	    }).error(function(data, status, headers, config){
	    	console.warn('This is a wrong username or/and a wrong password. Try again');
	    	jQuery('#loginAlert').html("Wrong username or password !");
	    	jQuery('#loginAlert').show();
	    	setTimeout(function(){jQuery('#loginAlert').hide();},4000);
	    });
	};
	
	$scope.logout = function(){
		$http.delete($scope.location)
		.success(function(data, status, headers, config){
			console.info('logged out');
			jQuery('#userLogin').show();
			jQuery('#userInfo').hide();
		});
	};
});