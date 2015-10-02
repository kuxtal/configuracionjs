'use strict';

/* Services */

/*
 http://docs.angularjs.org/api/ngResource.$resource

 Default ngResources are defined as

 'get':    {method:'GET'},
 'save':   {method:'POST'},
 'query':  {method:'GET', isArray:true},
 'remove': {method:'DELETE'},
 'delete': {method:'DELETE'}

 */

var services = angular.module('app.services', ['ngResource']);

services.factory('MenuFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/moduloes/menuJson?idPortal=:idPortal', {}, {
        query: { method: 'GET', isArray: true, cache: false },
        findPortalMenu: { method: 'GET', isArray: true, cache: false, params: {idPortal: '@idPortal'} }
    })
});

services.factory('ServiciosGlobales', function() {
	return {
		API_URL : 'http://applocal\\:8080/pruebatoken-0.0.1-SNAPSHOT/api',
		SSO_URL : 'http://applocal\\:8080/configuracion',
		PORTAL_URL : 'http://applocal\\:8080/configuracion'
	};
});