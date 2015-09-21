'use strict';

app.controller('servicios_ctrl', 
	function ($scope, ServiciosFactory, ServicioFactory, $location, $timeout) {
		$scope.titulo = 'Servicios';
		$scope.urlBase = '/servicio'; 
		$scope.lista = ServiciosFactory.query();
	
		// callback for ng-click 'show':
    	$scope.show = function (idObjeto) {
    		$location.path($scope.urlBase + '/' + idObjeto);
    	};
    	
        // callback for ng-click 'updateForm':
        $scope.updateForm = function (idObjeto) {
        	$location.path($scope.urlBase + '/form/' + idObjeto);
        };
    	
        // callback for ng-click 'createForm':
        $scope.createForm = function () {
        	$location.path($scope.urlBase + '/create/form');
        };
	
        // callback for ng-click 'delete':
        $scope.delete = function (idObjeto) {
        	ServicioFactory.delete({ id: idObjeto }, function(data) {
        		$scope.lista = ServiciosFactory.query();
        	});
        }; 
    });

app.controller('servicio_ctrl', 
	function ($scope,  $routeParams, ServiciosFactory, ServicioFactory, $location) {
		$scope.titulo = 'Servicio';
		$scope.urlBase = '/servicio';
		$scope.objeto = ServicioFactory.show({id: $routeParams.id});
	
	    // callback for ng-click 'updateForm':
	    $scope.updateForm = function (idObjeto) {
	        $location.path($scope.urlBase + '/form/' + idObjeto);
	    };
	    
	    // callback for ng-click 'update':
	    $scope.update = function () {
	    	ServicioFactory.update($scope.objeto, function(data) {
	    		$location.path($scope.urlBase);
        	});
	    };
	    
	    // callback for ng-click 'delete':
	    $scope.delete = function (idObjeto) {
	    	ModuloFactory.delete({ id: idObjeto });
	    	$location.path($scope.urlBase);
	    }; 
	    
	    // callback for ng-click 'cancel':
	    $scope.cancel = function () {
	        $location.path($scope.urlBase);
	    };
	});


app.controller('servicio_createForm_ctrl', 
	function ($scope,  ServiciosFactory, $location) {
		$scope.titulo = 'Servicio';
		$scope.urlBase = '/servicio';
	    
		// callback for ng-click 'create':
	    $scope.create = function () {
	    	ServiciosFactory.create($scope.objeto, function(data) {
	    		$location.path($scope.urlBase);
        	});
	    }
	    
	    // callback for ng-click 'cancel':
	    $scope.cancel = function () {
	        $location.path($scope.urlBase);
	    };
	});