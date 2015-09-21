'use strict';

services.factory('PortalesFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/portals', {}, {
        query: { method: 'GET', isArray: true, cache: false },
        create: { method: 'POST' }
    })
});

services.factory('PortalFactory', function ($resource, ServiciosGlobales) {
    return $resource(ServiciosGlobales.API_URL + '/portals/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});