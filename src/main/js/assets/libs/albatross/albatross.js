/**
 * @author: Hafiz Junaid
 */

(function (window, undefined) {

    var albatross = {}, $ = jQuery = window.jQuery;

    var DEFS = {
        STYLE_ITEM_SELECTED : "a-relational-map-item-selected",
        STYLE_ITEM : "a-relational-map-item",
        STYLE_ITEM_DISABLED : "a-relational-map-item-disabled",
        STYLE_X_AXIS : "a-relational-map-x-axis",
        STYLE_Y_AXIS : "a-relational-map-y-axis",
        EVENT_CLICK : "click",
        EVENT_SELECT : "select",
        ID_SPLITTER:"__"
    }

    albatross.relationalMap = function (config) {
        this.statusClassHash = [];
        return this.create(config);
    }

    albatross.relationalMap.defaultConfig = {
    }

    albatross.relationalMap.prototype.create = function (config) {
        if (config == undefined || config == null) {
            throw ("Must pass configuration object");
        }
        if (!config.hasOwnProperty("elementId")) {
            throw ("Target element id missing ");
        }
        var element = $('#' + config.elementId);
        element.css('position','relative');
        addMainCss.apply(this, [element, config]);
        draw.apply(this, [element, config]);
        addEventListeners(element, config);
    }

    albatross.relationalMap.prototype.destroy = function () {

    }

    albatross.relationalMap.prototype.setDataSource = function (data, config) {
        var xData = data.xDataProvider , yData = data.yDataProvider;
        drawMainPlot(xData, yData, config);
    }

    albatross.relationalMap.prototype.getSelected = function () {

    }

    albatross.relationalMap.prototype.setSelected = function (id) {

    }

    albatross.relationalMap.prototype.updateStatusData = function (data) {
        for (var xKey in data) {
            var xItem = data[xKey];
            for (var yKey in xItem) {
                var yItem = xItem[yKey];
                var temp = "#" + xKey + DEFS.ID_SPLITTER + yKey, elm = $(temp);
                elm.removeClass(this.statusClassHash[temp]);
                elm.addClass(yItem.className);
                this.statusClassHash[temp] = yItem.className;
            }
        }
    }

    function drawMainPlot(xData, yData, config) {
        var itemDimension = config.styles.itemDimension || 50;
        var margin = 5, yAxisWidth = 30, xAxisWidth = 20;
        var parent = $('#' + config.elementId);
        var mainPlot = $("<div></div>");
        mainPlot.addClass("a-main-plot");

        for (var x = 0; x < xData.length; x++) {
            for (var y = 0; y < yData.length; y++) {
                var yDataItem = yData[y];
                var xDataItem = xData[x];
                var classes = DEFS.STYLE_ITEM;
                if (x == y && config.diagonal) {
                    classes = classes + " " + DEFS.STYLE_ITEM_DISABLED;
                }
                addItem(parent, getXPos(x), getYPos(y), classes, {xData : xDataItem, yData : yDataItem});
            }
        }

        drawLabels(parent, xData, yData, config);

        function addItem(parent, x, y, classes, data) {
            var elem = $("<div></div>");
            elem.prop("id", data.xData.field + DEFS.ID_SPLITTER + data.yData.field);
            applyPosition(elem, x, y, classes);
            elem.data('a-data', data);
            parent.append(elem);
        }

        function getXPos(x) {
            return yAxisWidth + margin * (x + 1) + x * itemDimension;
        }

        function getYPos(y) {
            return xAxisWidth + margin * (y + 1) + y * itemDimension;
        }

        function drawLabels(element, xData, yData, config) {
            for (var i = 0; i < xData.length; i++) {
                var item = xData[i];
                var elem = getElem(item, itemDimension, DEFS.STYLE_X_AXIS);
                applyPosition(elem, getXPos(i), margin, "");
                element.append(elem);
            }

            for (var i = 0; i < yData.length; i++) {
                var item = yData[i];
                var elem = getElem(item, null, DEFS.STYLE_Y_AXIS);
                applyPosition(elem, margin, getYPos(i) + (itemDimension - 20) / 2, "");
                element.append(elem);
            }
            function getElem(item, width, clazz) {
                return  $("<label></label>").text(item.title).addClass(clazz).width(width);
            }

        }

        function applyPosition(elem, x, y, classes) {
            elem.css("position", "absolute");
            elem.css("left", x);
            elem.css("top", y);
            elem.addClass(classes);
        }
    }

    function draw(element, config) {
        if (!!config.data) {
            this.setDataSource(config.data, config);
        }
    }

    function addEventListeners(element, config) {
        element.click(function (e) {
            var elm = $(e.target);
            if (elm.hasClass(DEFS.STYLE_ITEM)) {
                fireEvent(DEFS.EVENT_CLICK, config, event, elm.data('a-data'));
                if (config.diagonal) {
                    if (!elm.hasClass(DEFS.STYLE_ITEM_DISABLED)) {
                        addRemoveClasses(elm, config);
                    }
                } else {
                    addRemoveClasses(elm, config);
                }
            }
        });

        function addRemoveClasses(elm, config) {
            if (!config.multiSelect) {
                $('.' + DEFS.STYLE_ITEM_SELECTED).removeClass(DEFS.STYLE_ITEM_SELECTED);
            }
            elm.addClass(DEFS.STYLE_ITEM_SELECTED);
            fireEvent(DEFS.EVENT_SELECT, config, event, elm.data('a-data'));
        }
    }

    function fireEvent(name, config, event, data) {
        if (config.hasOwnProperty(name)) {
            config[name](data, event);
        }
    }

    function addMainCss(element, config) {
        element.addClass('a-main');
    }

    window.albatross = albatross;

}(window));