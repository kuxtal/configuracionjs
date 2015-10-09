'use strict';

services.factory('PortalService', function ($resource, ServiciosGlobales) {
	var serviceurl = ServiciosGlobales.API_URL + '/portals';
	
	return $resource(serviceurl + '/:id/:adicional', {}, {
        'query': { method: 'GET', isArray: true},
        'get': {
            method: 'GET',
            transformResponse: function (data) {
                data = angular.fromJson(data);
                return data;
            }, 
            params : { id: '@id' }
        },
        'update': { method:'PUT' },
        'buscaAdicionales': { method: 'GET', isArray: true, params: { id: '@id' , adicional: '@adicional'}}
    });
});
