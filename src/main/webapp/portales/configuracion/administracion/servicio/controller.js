'use strict';

app.controller('servicio_ctrl', 
	function ($scope, ServiciosService) {
		$scope.tituloBase	= 'Servicios';
		$scope.tituloSingular= 'Servicio';
		$scope.lista		= [];
		$scope.registro		= null;
		
		$scope.modoEditable	= false;
		$scope.tituloModal	= '';
		
		$scope.loadAll = function() {
			ServiciosService.query(function(result) {
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
			
			ServiciosService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Detalle ' + $scope.tituloSingular;
                $("#modalForm").modal('show');
            });
		};
		
		$scope.updateForm = function (objeto) {
        	$scope.modoEditable	= true;
	    	
	    	ServiciosService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Editar ' + $scope.tituloSingular;
                $("#modalForm").modal('show');
            });
	    };
	    
	    $scope.save = function () {
	    	if ($scope.registro.id != null) {
            	ServiciosService.update($scope.registro, onSaveFinished);
            } else {
            	ServiciosService.save($scope.registro, onSaveFinished);
            }
	    };
	
	    $scope.delete = function (objeto) {
        	var registroActual = $scope.registro;
        	
        	ServiciosService.delete({id: registroActual.id},
        			function () {
                        $scope.loadAll();
                        $('#confirmModal').modal('hide');
                        $scope.clear();
                    });
        };
	    
        $scope.showconfirm = function (objeto) {
        	ServiciosService.get({id: objeto.id}, function(result) {
                $scope.registro = result;
                $("#confirmModal").modal('show');
            });
        };
        
        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };
        
        $scope.clear = function () {
            $scope.registro = {nombre: null, descripcion: null, id: null, url: null};
        };
        
        var onSaveFinished = function (result) {
        	$scope.loadAll();
        	$("#modalForm").modal('hide');
        };
        
        $scope.loadAll();
});
