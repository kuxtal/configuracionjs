'use strict';
 
app.controller('modulo_ctrl', 
	function ($scope, ModuloService, MenuService) {
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
            $("#modalForm").modal('show');
        };
	
    	$scope.showForm = function (objeto) {
    		$scope.modoEditable	= false;

    		ModuloService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Detalle ' + $scope.tituloSingular;
            	$("#modalForm").modal('show');
            });
    	};
    	
        $scope.updateForm = function (objeto) {
        	$scope.modoEditable	= true;
        	
        	if($("#modalForm").is(':visible')){
        		$("#modalForm").modal('hide');
        	}
        	
        	ModuloService.get({id : objeto.id}, function(result) {
                $scope.registro = result;
                
                $scope.tituloModal = 'Editar ' + $scope.tituloSingular;
            	$("#modalForm").modal('show');
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
        	$("#modalForm").modal('hide');
        };
        
        $scope.loadAll();
        
        // Funciones, Atributos Adicionales
        $scope.listaMenuOpciones 	= [];
        $scope.nvoMenuOpcion		= {id:null, nombre:null, texto:null, url:null, orden:null};
        $scope.nvoSubMenuOpcion		= {id:null, nombre:null, texto:null, url:null, orden:null};
        
        $scope.showMenu = function(){
        	$scope.listaMenuOpciones = ModuloService.buscaAdicionales({id : $scope.registro.id, adicional : 'menuopciones'}, function(){
        		$.each($scope.listaMenuOpciones, function(index, valor){
            		valor.listaMenuOpciones = MenuService.buscaAdicionales({id : valor.id, adicional : 'menuopciones'});
            	});
        	});

        	$("#modalMenuForm").modal('show');
        }
        
        $scope.agregarMenuOpcion = function(){
        	$scope.nvoMenuOpcion.modulo = $scope.registro;
        	
        	MenuService.save($scope.nvoMenuOpcion, function(){
        		$scope.nvoMenuOpcion	= {id:null, nombre:null, texto:null, url:null, orden:null};
        		$scope.listaMenuOpciones = ModuloService.buscaAdicionales({id : $scope.registro.id, adicional : 'menuopciones'}, function(){
            		$.each($scope.listaMenuOpciones, function(index, valor){
                		valor.listaMenuOpciones = MenuService.buscaAdicionales({id : valor.id, adicional : 'menuopciones'});
                	});
            	});
        	});
        }
        
        $scope.eliminarMenuOpcion = function(objeto){
        	MenuService.delete({id: objeto.id}, function () {
        		$scope.listaMenuOpciones = ModuloService.buscaAdicionales({id : $scope.registro.id, adicional : 'menuopciones'}, function(){
            		$.each($scope.listaMenuOpciones, function(index, valor){
                		valor.listaMenuOpciones = MenuService.buscaAdicionales({id : valor.id, adicional : 'menuopciones'});
                	});
            	});
        	});
        }
        
        $scope.agregarSubMenuOpcion = function(menuOpcion){
        	$scope.nvoSubMenuOpcion.opcionPadre = menuOpcion;

            MenuService.save($scope.nvoSubMenuOpcion, function(){
                $scope.nvoSubMenuOpcion  = {id:null, nombre:null, texto:null, url:null, orden:null};
                $scope.listaMenuOpciones = ModuloService.buscaAdicionales({id : $scope.registro.id, adicional : 'menuopciones'}, function(){
                    $.each($scope.listaMenuOpciones, function(index, valor){
                        valor.listaMenuOpciones = MenuService.buscaAdicionales({id : valor.id, adicional : 'menuopciones'});
                    });
                });
            });
        }
        
        $scope.eliminarSubMenuOpcion = function(objeto){
        	MenuService.delete({id: objeto.id}, function () {
                $scope.listaMenuOpciones = ModuloService.buscaAdicionales({id : $scope.registro.id, adicional : 'menuopciones'}, function(){
                    $.each($scope.listaMenuOpciones, function(index, valor){
                        valor.listaMenuOpciones = MenuService.buscaAdicionales({id : valor.id, adicional : 'menuopciones'});
                    });
                });
            });
        }
});