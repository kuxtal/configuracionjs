'use strict';

app.controller('portal_list_ctrl', function ($scope, ServiciosGlobales, PortalesFactory, PortalFactory, $location) {
		$scope.urlBase = ServiciosGlobales.PORTAL_URL + '/administracion/portal';
		$scope.portales = PortalesFactory.query();
	
		// callback for ng-click 'editUser':
    	$scope.show = function (portalId) {
    		$location.path($scope.urlBase + '/' +portalId);
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
        	PortalFactory.delete({ id: portalId });
        	$scope.portales = PortalesFactory.query();
        }; 
    });

app.controller('portal_show_ctrl', function ($scope,  $routeParams, ServiciosGlobales, PortalFactory, ParametrosFactory, ModulosFactory, $location) {
	$scope.urlBase = ServiciosGlobales.PORTAL_URL + '/administracion/portal';
	$scope.portal = PortalFactory.show({id: $routeParams.id});
	$scope.parametros = ParametrosFactory.query();
	$scope.modulos = ModulosFactory.query();

    // callback for ng-click 'editUser':
    $scope.updateForm = function (portalId) {
        $location.path($scope.urlBase + '/form/' + portalId);
    };
    
    // callback for ng-click 'deleteUser':
    $scope.delete = function (portalId) {
    	PortalFactory.delete({ id: portalId });
    	$location.path($scope.urlBase);
    }; 
    
    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path($scope.urlBase);
    };
    
    $scope.createFormParametro = function () {
    	$location.path(ServiciosGlobales.PORTAL_URL + '/parametro/create/form');
    };
    
    $scope.createFormModulo = function () {
    	$location.path(ServiciosGlobales.PORTAL_URL + '/modulo/create/form');
    };
});


app.controller('portal_updateForm_ctrl', function ($scope,  $routeParams, ServiciosGlobales, PortalFactory, $location) {
	$scope.urlBase = ServiciosGlobales.PORTAL_URL + '/administracion/portal';
	$scope.portal = PortalFactory.show({id: $routeParams.id});

    // callback for ng-click 'updateUser':
    $scope.update = function () {
    	PortalFactory.update($scope.portal);
        $location.path($scope.urlBase);
    };

    // callback for ng-click 'deleteUser':
    $scope.delete = function (userId) {
    	PortalFactory.delete({ id: userId });
        $scope.portales = PortalesFactory.query();
    }; 
    
    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path($scope.urlBase);
    };
});


app.controller('portal_createForm_ctrl', function ($scope, ServiciosGlobales, PortalesFactory, $location) {
	$scope.urlBase = ServiciosGlobales.PORTAL_URL + '/administracion/portal';
    // callback for ng-click 'createNewUser':
    $scope.create = function () {
    	PortalesFactory.create($scope.portal);
    	$location.path($scope.urlBase);
    }
    
    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path($scope.urlBase);
    };

});