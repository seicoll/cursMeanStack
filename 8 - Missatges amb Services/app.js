'use strict';

var app = angular.module('appLearn', []);


        //MissatgesController
        app.controller('MissatgesController', ['$scope', 'MissatgesService', function($scope, MissatgesService) {
            $scope.showMessage = false;
            $scope.message = "Carregant dades ...";

            //Obtenim les dades
            MissatgesService.fetch()
                .success(function(data) {
                    $scope.missatges = data;
                })
                .error(function(response) {
                    $scope.message = "Error al obtenir dades: " /*+ response.status + " " + response.statusText*/;
                    $scope.showMessage = true;
                });

            //Afegir nou missatge
            $scope.afegirMissatge = function() {
                if ($scope.missatgeBody) {
                    MissatgesService.create({
                            username: "jofrecasevella.cat",
                            body: $scope.missatgeBody
                        })
                        .success(function(missatge) {
                            $scope.missatges.unshift(missatge);
                            $scope.missatgeBody = null;
                        })
                        .error(function(response) {
                            $scope.message = "Error al afegir missatge: " + response.status + " " + response.statusText;
                            $scope.showMessage = true;
                        });
                }
            };

            //Eliminar Missatge
            $scope.eliminarMissatge = function(missatge) {
                MissatgesService.delete(missatge)
                    .success(function() {
                        var index = $scope.missatges.indexOf(missatge);
                        $scope.missatges.splice(index, 1);
                    })
                    .error(function(response) {
                        $scope.message = "Error al eliminar missatge: " + response.status + " " + response.statusText;
                        $scope.showMessage = true;
                    });
            };

            //Editar Missatge
            $scope.editarMissatge = function(missatge) {
                $scope.missatgeEdicio = {};
                $scope.missatgeEdicio.username = missatge.username;
                $scope.missatgeEdicio.body = missatge.body;

                this.editing = true;
            };

            //Guardar Missatge
            $scope.guardarMissatge = function(missatge) {
                if ($scope.missatgeEdicio.username && $scope.missatgeEdicio.body) {
                   MissatgesService.update(missatge.id, {
                            username: $scope.missatgeEdicio.username,
                            body: $scope.missatgeEdicio.body
                        })
                        .success(function() {
                            missatge.username = $scope.missatgeEdicio.username;
                            missatge.body = $scope.missatgeEdicio.body;
                            $scope.missatgeEdicio = {};
                        })
                        .error(function(response) {
                            $scope.message = "Error al guardar missatge: " + response.status + " " + response.statusText;
                            $scope.showMessage = true;
                        });
                    this.editing = false;
                }
            };
        }]);