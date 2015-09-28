'use strict';

services.factory('ServiciosService', function ($resource, ServiciosGlobales) {
	var serviceurl = ServiciosGlobales.API_URL + '/servicios';
	
	return $resource(serviceurl + '/:id', { id: '@id' }, {
        'query': { method: 'GET', isArray: true},
        'get': {
            method: 'GET',
            transformResponse: function (data) {
                data = angular.fromJson(data);
                return data;
            }
        },
        'update': { method:'PUT' }
    });
});
