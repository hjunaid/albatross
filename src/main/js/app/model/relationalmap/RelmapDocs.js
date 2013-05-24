/**
 * @author: Junaid Malik
 */
'use strict'
angular.module('albatross').factory('relmapDocs', ['documentationModel', function (model) {
    var docPage = new model.DocumentationPage();

    function init() {
        /*Configuration*/
        var item = new model.DocumentationItem("Relational Map", "diagonal", "Boolean", "false", "Set diagonal property to disable diagonal items. User wont be able to select disabled items");
        docPage.configuration.push(item);

        item = new model.DocumentationItem("Relational Map", "multiSelect", "Boolean", "false", "Allow selection of multiple boxes");
        docPage.configuration.push(item);

        item = new model.DocumentationItem("Relational Map", "elementId", "String", "", "ID of the element where Relational Map will be generated");
        docPage.configuration.push(item);

        item = new model.DocumentationItem("Relational Map", "data", "Object", "", "Data for the component. Refer to data.xDataProvider and data.yDataProvider for more details");
        docPage.configuration.push(item);

        item = new model.DocumentationItem("Relational Map", "data.xDataProvider", "Object", "", "An array of objects which will be plotted on x-axis. Each object should have field and title property. e.g. {field:'a1', title:'A1'}");
        docPage.configuration.push(item);

        item = new model.DocumentationItem("Relational Map", "data.yDataProvider", "Object", "", "An array of objects which will be plotted on y-axis. Each object should have field and title property. e.g. {field:'a1', title:'A1'}");
        docPage.configuration.push(item);

        /*Methods*/
        item = new model.DocumentationItem("Relational Map", "updateStatusData", "Function", "", "Update satus of each box in the diagram. Takes a two dimensional object with information about class names to be applied on individual box. e.g {a1:{m1:{className:'item-red'}}}. See API section for more details.");
        docPage.methods.push(item);
        /*Events*/
        item = new model.DocumentationItem("Relational Map", "select", "Function", "", "Fired when an item is selected. Takes a function as parameter and invokes it with data and event");
        docPage.events.push(item);

        item = new model.DocumentationItem("Relational Map", "click", "Function", "", "Fired when an item is clicked. Takes a function as parameter and invokes it with data and event");
        docPage.events.push(item);
        /*Styles*/
        item = new model.DocumentationItem("Relational Map", "styles.itemDimension", "Integer", "50", "Defines fixed width for each item");
        docPage.css.push(item);
    }

    docPage.getCode = function (name) {
        if (name == "relmap.basic") {
            return "var config = {\n" +
                "    elementId : 'relationalMap', \n" +
                "    styles : {                 \n" +
                "    itemDimension : 50     \n" +
                " },                           \n" +
                "  multiSelect : false,           \n" +
                " diagonal : false,                \n" +
                " data : {                           \n" +
                "    xDataProvider :[{field : 'a1', title : 'A 1'},{field : 'a2', title : 'A 2'},{field : 'a3', title : 'A 3'},{field : 'a4', title : 'A 4'}], \n" +
                "        yDataProvider :[{field : 'm1', title : 'M 1'},{field : 'm2', title : 'M 2'},{field : 'm3', title : 'M 3'},{field : 'm4', title : 'M 4'}]  \n" +
                "   }                 \n" +
                " };   \n" +

            "  var relMap = new albatross.relationalMap(config);"
        } else {
            return "Work in progress..."
        }
    }
    init();

    return docPage;
}]);