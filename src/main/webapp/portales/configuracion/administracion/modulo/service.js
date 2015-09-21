'use strict';

services.factory('ModulosFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/moduloes', {}, {
        query: { method: 'GET', isArray: true, cache: false },
        create: { method: 'POST' }
    })
});

services.factory('ModuloFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/moduloes/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});