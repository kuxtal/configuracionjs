'use strict';

// Comentario
angular.module('appConfiguracion', ['ngRoute', 'app.services', 'app.controllers', 'app.directives', 'app.filters', 'toggle-switch']).
    config(function ($routeProvider, $httpProvider, $locationProvider) {
    	$routeProvider.when('/inicio', {templateUrl: 'inicio.html', controller: 'inicio_ctrl'});
        
    	$routeProvider.when('/login', {templateUrl: 'login.html', controller: 'autenticacion_ctrl'});
    	
    	$routeProvider.when('/configuracion', {templateUrl: 'portales/configuracion/inicio.html', controller: 'inicio_ctrl'});
    	$routeProvider.when('/configuracion/administracion/portal', {templateUrl: 'portales/configuracion/administracion/portal/portal.html', controller: 'portal_ctrl'});
        
        $routeProvider.when('/configuracion/administracion/modulo', {templateUrl: 'portales/configuracion/administracion/modulo/modulo.html', controller: 'modulo_ctrl'});
        
        $routeProvider.when('/configuracion/administracion/parametro', {templateUrl: 'portales/configuracion/administracion/parametro/parametro.html', controller: 'parametro_ctrl'});
        
        $routeProvider.when('/configuracion/administracion/menu', {templateUrl: 'portales/configuracion/administracion/menu/menu.html', controller: 'menu_ctrl'});

        $routeProvider.when('/configuracion/administracion/perfil', {templateUrl: 'portales/configuracion/administracion/perfil/perfil.html', controller: 'perfil_ctrl'});
        
        $routeProvider.otherwise({redirectTo: '/inicio'});
        
    });