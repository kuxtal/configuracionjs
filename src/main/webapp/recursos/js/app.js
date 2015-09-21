'use strict';

// Declare app level module which depends on filters, and services
angular.module('appConfiguracion', ['ngRoute', 'app.services', 'app.controllers', 'app.directives', 'app.filters']).
    config(function ($routeProvider, $httpProvider, $locationProvider) {
    	$routeProvider.when('/inicio', {templateUrl: 'inicio.html', controller: 'inicio_ctrl'});
        
    	$routeProvider.when('/login', {templateUrl: 'login.html', controller: 'autenticacion_ctrl'});
    	
    	$routeProvider.when('/configuracion', {templateUrl: 'portales/configuracion/inicio.html', controller: 'inicio_ctrl'});
    	$routeProvider.when('/configuracion/administracion/portal', {templateUrl: 'portales/configuracion/administracion/portal/list.html', controller: 'portal_list_ctrl'});
        $routeProvider.when('/configuracion/administracion/portal/:id', {templateUrl: 'portales/configuracion/administracion/portal/show.html', controller: 'portal_show_ctrl'});
        $routeProvider.when('/configuracion/administracion/portal/form/:id', {templateUrl: 'portales/configuracion/administracion/portal/updateForm.html', controller: 'portal_updateForm_ctrl'});
        $routeProvider.when('/configuracion/administracion/portal/create/form', {templateUrl: 'portales/configuracion/administracion/portal/createForm.html', controller: 'portal_createForm_ctrl'});
        
        $routeProvider.when('/configuracion/administracion/modulo', {templateUrl: 'portales/configuracion/administracion/modulo/list.html', controller: 'modulo_list_ctrl'});
        $routeProvider.when('/configuracion/administracion/modulo/:id', {templateUrl: 'portales/configuracion/administracion/modulo/show.html', controller: 'modulo_show_ctrl'});
        $routeProvider.when('/configuracion/administracion/modulo/form/:id', {templateUrl: 'portales/configuracion/administracion/modulo/updateForm.html', controller: 'modulo_updateForm_ctrl'});
        $routeProvider.when('/configuracion/administracion/modulo/create/form', {templateUrl: 'portales/configuracion/administracion/modulo/createForm.html', controller: 'modulo_createForm_ctrl'});
        
        $routeProvider.when('/configuracion/administracion/parametro', {templateUrl: 'portales/configuracion/administracion/parametro/list.html', controller: 'parametros_ctrl'});
        $routeProvider.when('/configuracion/administracion/parametro/:id', {templateUrl: 'portales/configuracion/administracion/parametro/show.html', controller: 'parametro_ctrl'});
        $routeProvider.when('/configuracion/administracion/parametro/form/:id', {templateUrl: 'portales/configuracion/administracion/parametro/updateForm.html', controller: 'parametro_ctrl'});
        $routeProvider.when('/configuracion/administracion/parametro/create/form', {templateUrl: 'portales/configuracion/administracion/parametro/createForm.html', controller: 'parametro_createForm_ctrl'});
        
        $routeProvider.when('/configuracion/administracion/servicio', {templateUrl: 'portales/configuracion/administracion/servicio/list.html', controller: 'servicios_ctrl'});
        $routeProvider.when('/configuracion/administracion/servicio/:id', {templateUrl: 'portales/configuracion/administracion/servicio/show.html', controller: 'servicio_ctrl'});
        $routeProvider.when('/configuracion/administracion/servicio/form/:id', {templateUrl: 'portales/configuracion/administracion/servicio/updateForm.html', controller: 'servicio_ctrl'});
        $routeProvider.when('/configuracion/administracion/servicio/create/form', {templateUrl: 'portales/configuracion/administracion/servicio/createForm.html', controller: 'servicio_createForm_ctrl'});
        
        $routeProvider.otherwise({redirectTo: '/inicio'});
        
        //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
/*    .run(function(auth) {
    	auth.init('/inicio', '/login', '/logout');
    });*/