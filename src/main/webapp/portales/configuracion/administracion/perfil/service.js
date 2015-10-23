'use strict';

services.factory('PerfilService', function ($resource, ServiciosGlobales) {
	var serviceurl = ServiciosGlobales.API_URL + '/perfils';
	
	return $resource(serviceurl + '/:id/:adicional', {}, {
        'query': { method: 'GET', isArray: true},
        'get': {
            method: 'GET',
            transformResponse: function (data) {
                data = angular.fromJson(data);
                return data;
            }
        },
        'update': { method:'PUT' },
        'buscaAdicionales': { method: 'GET', isArray: true, params: { id: '@id' , adicional: '@adicional'}}
    });
});