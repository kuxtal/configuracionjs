'use strict';

app.controller('modulo_list_ctrl', 
	function ($scope, ModulosFactory, ModuloFactory, $location) {
		$scope.urlBase = '/modulo';
		$scope.modulos = ModulosFactory.query();
	
		// callback for ng-click 'editUser':
    	$scope.show = function (portalId) {
    		$location.path($scope.urlBase + '/' + portalId);
    	};
    	
        // callback for ng-click 'editUser':
        $scope.updateForm = function (portalId) {
        	$location.path($scope.urlBase + '/form/' + portalId);
        };
    	
        // callback for ng-click 'createUser':
        $scope.createForm = function () {
        	$location.path($scope.urlBase + '/create/form');
        };
	
        // callback for ng-click 'deleteUser':
        $scope.delete = function (portalId) {
        	ModuloFactory.delete({ id: portalId });
        	$scope.modulos = ModulosFactory.query();
        }; 
    });

app.controller('modulo_show_ctrl', function ($scope,  $routeParams, ModuloFactory, $location) {
	$scope.urlBase = '/modulo';
	$scope.modulo = ModuloFactory.show({id: $routeParams.id});

    // callback for ng-click 'editUser':
    $scope.updateForm = function (portalId) {
        $location.path($scope.urlBase + '/form/' + portalId);
    };
    
    // callback for ng-click 'deleteUser':
    $scope.delete = function (portalId) {
    	ModuloFactory.delete({ id: portalId });
    	$location.path($scope.urlBase);
    }; 
    
    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path($scope.urlBase);
    };

});


app.controller('modulo_updateForm_ctrl', function ($scope,  $routeParams, ModuloFactory, $location) {
	$scope.urlBase = '/modulo';
	$scope.modulo = ModuloFactory.show({id: $routeParams.id});

    // callback for ng-click 'updateUser':
    $scope.update = function () {
    	ModuloFactory.update($scope.portal);
        $location.path($scope.urlBase);
    };

    // callback for ng-click 'deleteUser':
    $scope.delete = function (userId) {
    	ModuloFactory.delete({ id: userId });
        $scope.portales = PortalesFactory.query();
    }; 
    
    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path($scope.urlBase);
    };

});


app.controller('modulo_createForm_ctrl', function ($scope,  ModulosFactory, $location) {
	$scope.urlBase = '/modulo';
    // callback for ng-click 'createNewUser':
    $scope.create = function () {
    	ModulosFactory.create($scope.portal);
    	$location.path($scope.urlBase);
    }
    
    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path($scope.urlBase);
    };

});
