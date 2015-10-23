'use strict';

app.controller('portal_ctrl', 
	function ($scope, PortalService, ParametroService, ModuloService, PerfilService) {
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

        // Atributos y Funciones Adicionales
        $scope.listaParametros= [];
        $scope.listaModulos = [];
        $scope.listaPerfiles= [];
        $scope.nvoparametro = {grupo:null, nombre: null, descripcion: null, id: null};
        $scope.nvoModulo    = {url:null, nombre: null, descripcion: null, id: null};
        $scope.nvoPerfil    = {id: null, nombre: null, descripcion: null};

        $scope.showParametros = function(){
            $scope.listaParametros = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'parametros'});
            $("#modalParametrosForm").modal('show');
        }
        
        $scope.showModulos = function(){
            $scope.listaModulos = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'modulos'});
            $("#modalModulosForm").modal('show');
            $("#listadoOpciones").hide();
        }
        
        $scope.agregarParametro = function(){
        	$scope.nvoparametro.portal = $scope.registro;
        	
        	ParametroService.save($scope.nvoparametro, function(){
        		$scope.nvoparametro	= {grupo:null, nombre: null, descripcion: null, id: null };
        		$scope.listaParametros = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'parametros'});
        	});
        }
        
        $scope.eliminarParametro = function (objeto) {
        	ParametroService.delete({id: objeto.id}, function () {
        		$scope.listaParametros = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'parametros'});
        	});
        };
        
        $scope.agregarModulo = function(){
        	$scope.nvoModulo.portal = $scope.registro;
        	
        	ModuloService.save($scope.nvoModulo, function(){
        		$scope.nvoModulo	= {url:null, nombre: null, descripcion: null, id: null};
        		$scope.listaModulos = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'modulos'});
        	});
        }
        
        $scope.eliminarModulo = function (objeto) {
        	ModuloService.delete({id: objeto.id}, function () {
        		$scope.listaModulos = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'modulos'});
        	});
        };
        
        
        $scope.showMenuOpciones = function(){
        	$("#listadoOpciones").show();
        }

        $scope.showPerfiles = function(){
            $scope.listaPerfiles = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'perfiles'});
            $("#modalPerfilesForm").modal('show');
        }

        $scope.agregarPerfil = function(){
            $scope.nvoPerfil.portal = $scope.registro;
            
            PerfilService.save($scope.nvoPerfil, function(){
                $scope.nvoPerfil    = {id: null, nombre: null, descripcion: null};
                $scope.listaPerfiles = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'perfiles'});
            });
        }
        
        $scope.eliminarPerfil = function (objeto) {
            PerfilService.delete({id: objeto.id}, function () {
                $scope.listaPerfiles = PortalService.buscaAdicionales({id : $scope.registro.id, adicional : 'perfiles'});
            });
        };
});