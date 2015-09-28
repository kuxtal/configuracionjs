'use strict';
 
app.controller('modulo_ctrl', 
	function ($scope, ModuloService) {
		$scope.tituloBase	= 'Modulos';
		$scope.tituloSingular= 'Modulo';
		$scope.lista 		= [];
		$scope.registro 	= null;
		
		$scope.modoEditable	= false;
		$scope.tituloModal	= '';
		
		$scope.loadAll = function() {
			ModuloService.query(function(result) {
               $scope.lista = result;
            });
        };

		$scope.createForm = function () {
        	$scope.registro 		= null;
        	$scope.modoEditable	= false;

        	$scope.tituloModal = 'Alta ' + $scope.tituloSingular;
            $("#modalUpdateForm").modal('show');
        };
	
    	$scope.showForm = function (objeto) {
    		$scope.modoEditable	= false;

    		ModuloService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Detalle ' + $scope.tituloSingular;
            	$("#modalShowForm").modal('show');
            });
    	};
    	
        $scope.updateForm = function (objeto) {
        	$scope.modoEditable	= true;
        	
        	if($("#modalShowForm").is(':visible')){
        		$("#modalShowForm").modal('hide');
        	}
        	
        	ModuloService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Editar ' + $scope.tituloSingular;
            	$("#modalUpdateForm").modal('show');
            });
        };
        
        $scope.save = function () {
            if ($scope.registro.id != null) {
            	ModuloService.update($scope.registro, onSaveFinished);
            } else {
            	ModuloService.save($scope.registro, onSaveFinished);
            }
        };
	
        $scope.delete = function (objeto) {
        	var registroActual = $scope.registro;
        	
        	ModuloService.delete({id: registroActual.id},
        			function () {
                        $scope.loadAll();
                        $('#confirmModal').modal('hide');
                        $scope.clear();
                    });
        };
        
        $scope.showconfirm = function (objeto) {
        	ModuloService.get({id: objeto.id}, function(result) {
                $scope.registro = result;
                $("#confirmModal").modal('show');
            });
        };
        
        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.registro = {nombre: null, descripcion: null, id: null};
        };
        
        var onSaveFinished = function (result) {
        	$scope.loadAll();
        	$("#modalUpdateForm").modal('hide');
        };
        
        $scope.loadAll();
});
