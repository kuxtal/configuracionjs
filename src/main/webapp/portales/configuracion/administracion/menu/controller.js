'use strict';

app.controller('menu_ctrl', 
	function ($scope, MenuService) {
		$scope.tituloBase	= 'Parametros';
		$scope.tituloSingular= 'Parametro';
		$scope.lista		= [];
		$scope.registro		= null;
		
		$scope.modoEditable	= false;
		$scope.tituloModal	= '';
		
		$scope.loadAll = function() {
			MenuService.query(function(result) {
               $scope.lista = result;
            });
        };
		
		$scope.createForm = function () {
			$scope.clear();
	    	$scope.modoEditable	= true;
	
	        $scope.tituloModal = 'Alta ' + $scope.tituloSingular;
	        $("#modalForm").modal('show');
	    };
	
		$scope.showForm = function (objeto) {
			$scope.modoEditable	= false;
			
			MenuService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Detalle ' + $scope.tituloSingular;
                $("#modalForm").modal('show');
            });
		};
		
		$scope.updateForm = function (objeto) {
        	$scope.modoEditable	= true;
        	//$scope.portales 	= PortalService.query();
	    	
	    	MenuService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Editar ' + $scope.tituloSingular;
                $("#modalForm").modal('show');
            });
	    };
	    
	    $scope.save = function () {
	    	if ($scope.registro.id != null) {
            	MenuService.update($scope.registro, onSaveFinished);
            } else {
            	MenuService.save($scope.registro, onSaveFinished);
            }
	    };
	
	    $scope.delete = function (objeto) {
        	var registroActual = $scope.registro;
        	
        	MenuService.delete({id: registroActual.id},
        			function () {
                        $scope.loadAll();
                        $('#confirmModal').modal('hide');
                        $scope.clear();
                    });
        };
	    
        $scope.showconfirm = function (objeto) {
        	MenuService.get({id: objeto.id}, function(result) {
                $scope.registro = result;
                $("#confirmModal").modal('show');
            });
        };
        
        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };
        
        $scope.clear = function () {
            $scope.registro = {grupo: null, nombre: null, valor: null, descripcion: null, id: null};
        };
        
        var onSaveFinished = function (result) {
        	$scope.loadAll();
        	$("#modalForm").modal('hide');
        };
        
        $scope.loadAll();
        
		// Parametros / Funciones Adicionales
		$scope.portalParametro	= null;
		$scope.portales			= [];
});
