'use strict';

var app = angular.module('appLearn');
app.constant("baseURL","http://javascript2-seicoll.c9users.io:8080/");

//Missatges Service
app.service("MissatgesService", function($http,baseURL) {
    
    //Obtenim les dades
    this.fetch = function() {
        return $http.get(baseURL+"api/missatges");
    };
    
    //Afegir nou missatge
    this.create = function(missatge) {
        return $http.post(baseURL+"api/missatges", missatge);
    };
    
    //Editar Missatge
    this.update = function(id,missatge) {
        return $http.put(baseURL+"api/missatges/" + id, missatge);
    };
    
    //Eliminar Missatge
    this.delete = function(id,missatge) {
        return $http.delete(baseURL+"api/missatges/" + id);
    };
});