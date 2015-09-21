'use strict';

app.controller('parametros_ctrl', 
	function ($scope, ParametrosFactory, ParametroFactory, $location, $timeout) {
		$scope.urlBase = '/configuracion/administracion/parametro'; 
		$scope.parametros = ParametrosFactory.query();
	
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
        	ParametroFactory.delete({ id: idObjeto }, function(data) {
        		$scope.parametros = ParametrosFactory.query();
        	});
        }; 
    });

app.controller('parametro_ctrl', 
	function ($scope,  $routeParams, ParametrosFactory, ParametroFactory, $location) {
		$scope.urlBase = '/configuracion/administracion/parametro';
		$scope.parametro = ParametroFactory.show({id: $routeParams.id});
	
	    // callback for ng-click 'updateForm':
	    $scope.updateForm = function (idObjeto) {
	        $location.path($scope.urlBase + '/form/' + idObjeto);
	    };
	    
	    // callback for ng-click 'update':
	    $scope.update = function () {
	    	ParametroFactory.update($scope.portal);
	        $location.path($scope.urlBase);
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


app.controller('parametro_createForm_ctrl', 
	function ($scope,  ParametrosFactory, $location) {
		$scope.urlBase = '/configuracion/administracion/parametro';
	    
		// callback for ng-click 'create':
	    $scope.create = function () {
	    	ParametrosFactory.create($scope.parametro, function(data) {
	    		$location.path($scope.urlBase);
        	});
	    }
	    
	    // callback for ng-click 'cancel':
	    $scope.cancel = function () {
	        $location.path($scope.urlBase);
	    };
	});