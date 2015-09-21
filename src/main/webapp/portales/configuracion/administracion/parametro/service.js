'use strict';

services.factory('ParametrosFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/parametroes', {}, {
        query: { method: 'GET', isArray: true, cache: false },
        create: { method: 'POST' }
    })
});

services.factory('ParametroFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/parametroes/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});