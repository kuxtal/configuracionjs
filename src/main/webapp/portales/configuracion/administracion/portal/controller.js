'use strict';

app.controller('portal_ctrl', 
	function ($scope, PortalService) {
		$scope.tituloBase	= 'Portales';
		$scope.tituloSingular= 'Portal';
		$scope.lista 		= [];
		$scope.registro 	= null;
		
		$scope.modoEditable	= false;
		$scope.tituloModal	= '';
		
		$scope.loadAll = function() {
			PortalService.query(function(result) {
               $scope.lista = result;
            });
        };

		$scope.createForm = function () {
        	$scope.registro 	= null;
        	$scope.modoEditable	= true;

        	$scope.tituloModal = 'Alta ' + $scope.tituloSingular;
            $("#modalForm").modal('show');
        };
	
    	$scope.showForm = function (objeto) {
    		$scope.modoEditable	= false;

    		PortalService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Detalle ' + $scope.tituloSingular;
            	$("#modalForm").modal('show');
            });
    	};
    	
        $scope.updateForm = function (objeto) {
        	$scope.modoEditable	= true;

        	PortalService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Editar Portal';
            	$("#modalForm").modal('show');
            });
        };
        
        $scope.save = function () {
            if ($scope.registro.id != null) {
            	PortalService.update($scope.registro, onSaveFinished);
            } else {
            	PortalService.save($scope.registro, onSaveFinished);
            }
        };
	
        $scope.delete = function (objeto) {
        	var registroActual = $scope.registro;
        	
        	PortalService.delete({id: registroActual.id},
        			function () {
                        $scope.loadAll();
                        $('#confirmModal').modal('hide');
                        $scope.clear();
                    });
        };
        
        $scope.showconfirm = function (objeto) {
        	PortalService.get({id: objeto.id}, function(result) {
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
        	$("#modalForm").modal('hide');
        };
        
        $scope.loadAll();
});
