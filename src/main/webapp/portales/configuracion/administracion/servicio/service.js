'use strict';

services.factory('ServiciosFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/servicios', {}, {
        query: { method: 'GET', isArray: true, cache: false },
        create: { method: 'POST' }
    })
});

services.factory('ServicioFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/servicios/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});