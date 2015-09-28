'use strict';

services.factory('PortalService', function ($resource, ServiciosGlobales) {
	var serviceurl = ServiciosGlobales.API_URL + '/portals';
	
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
