'use strict';

app.controller('perfil_ctrl', 
	function ($scope, PerfilService, PortalService, MenuService) {
		$scope.tituloBase	= 'Perfiles';
		$scope.tituloSingular= 'Perfil';
		$scope.lista		= [];
		$scope.registro		= null;
		
		$scope.modoEditable	= false;
		$scope.tituloModal	= '';
		
		$scope.loadAll = function() {
			PerfilService.query(function(result) {
               $scope.lista = result;
            });
        };
		
		$scope.createForm = function () {
			$scope.clear();
	    	$scope.modoEditable	= true;

            $scope.portales     = PortalService.query();
	
	        $scope.tituloModal = 'Alta ' + $scope.tituloSingular;
	        $("#modalForm").modal('show');
	    };
	
		$scope.showForm = function (objeto) {
			$scope.modoEditable	= false;
			
			PerfilService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Detalle ' + $scope.tituloSingular;
                $("#modalForm").modal('show');
            });
		};
		
		$scope.updateForm = function (objeto) {
        	$scope.modoEditable	= true;
        	$scope.portales 	= PortalService.query();
	    	
	    	PerfilService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Editar ' + $scope.tituloSingular;
                $("#modalForm").modal('show');
            });
	    };
	    
	    $scope.save = function () {
            PortalService.get({id: $scope.registro.portal.id}, function(portalResult){
                $scope.registro.portal = portalResult;

                if ($scope.registro.id != null) {
                    PerfilService.update($scope.registro, onSaveFinished);
                } else {
                    PerfilService.save($scope.registro, onSaveFinished);
                }
            });
	    };
	
	    $scope.delete = function (objeto) {
        	var registroActual = $scope.registro;
        	
        	PerfilService.delete({id: registroActual.id},
        			function () {
                        $scope.loadAll();
                        $('#confirmModal').modal('hide');
                        $scope.clear();
                    });
        };
	    
        $scope.showconfirm = function (objeto) {
        	PerfilService.get({id: objeto.id}, function(result) {
                $scope.registro = result;
                $("#confirmModal").modal('show');
            });
        };
        
        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };
        
        $scope.clear = function () {
            $scope.registro = {id: null, nombre: null, descripcion: null};
        };
        
        var onSaveFinished = function (result) {
        	$scope.loadAll();
        	$("#modalForm").modal('hide');
        };
        
        $scope.loadAll();

        // Parametros y Funciones Adicionales
        $scope.portalPerfil     = null;
        $scope.portales         = [];
        $scope.listaOpciones    = [];
        $scope.listaOpcionesPerfil = [];

        $scope.showPermisos = function(){
            MenuService.query(function(result) {
               $scope.listaOpciones = result;

               PerfilService.buscaAdicionales({id : $scope.registro.id, adicional : 'opciones'}, activaOpciones);
            });

            $('#modalOpcionesForm').modal('show');
        }

        $scope.guardarOpciones = function(){
            $scope.listaOpcionesPerfil = [];
            $scope.listaOpciones.forEach(function(opcion){
                if(opcion.disponible) 
                    $scope.listaOpcionesPerfil.push(opcion);
            });

            $scope.registro.opciones = $scope.listaOpcionesPerfil;
            PerfilService.save($scope.registro, function(){
                $("#modalOpcionesForm").modal('hide');
            });
        }

        var activaOpciones = function (result) {
            $scope.listaOpcionesPerfil = result;

            $scope.listaOpciones.forEach(function(opcion) {
                opcion.disponible = false;
                $scope.listaOpcionesPerfil.forEach(function(opcionPerfil) {
                    if(opcion.id == opcionPerfil.id)
                        opcion.disponible = true;
                });
            });
        };
});
