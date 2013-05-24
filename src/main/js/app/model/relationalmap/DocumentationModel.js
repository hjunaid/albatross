/**
 * @author: Junaid Malik
 */
'use strict'
angular.module('albatross').factory('documentationModel', function () {
    var model = {};

    model.DocumentationPage = function () {
        this.configuration = [],
            this.methods = [],
            this.events = [],
            this.css = []
    };

    model.DocumentationItem = function (component, name, type, defaultValue, text) {
        this.component = component,
            this.name = name,
            this.type = type,
            this.defaultValue = defaultValue,
            this.text = text
    }

    return model;
});