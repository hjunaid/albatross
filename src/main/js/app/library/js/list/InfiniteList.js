/**
 * @author: Junaid Malik
 */
(function InfiniteList(window) {
    var albatross = {};
    albatross.infiniteList = function (config) {
        this._STYLE_ITEM_SELECTED = 'a-list-item-selected';
        this._STYLE_ITEM_ENABLED = 'a-list-item-enabled';
        this._STYLE_ITEM_DISABLED = 'a-list-item-disabled';
        this.config = config;
        this.checkConfig();
        this.createList();
    }

    albatross.infiniteList.prototype.createList = function () {
        document.querySelector('#' + this.config.elementId).innerHTML = '<ul class="a-infinite-list"></ul>';
        this.element = document.querySelector('#' + this.config.elementId + ' ul');
        this.addListeners();
        this.updateView(0, 20);
    }

    albatross.infiniteList.prototype.addListeners = function () {
        var self = this;
        if (this.element.addEventListener) {
            this.element.addEventListener('click', clickHandler, false);
        } else {
            this.element.attachEvent('onclick', clickHandler);
        }
        function clickHandler(e) {
            var target = e.srcElement || e.target;
            if (target.className.search(self._STYLE_ITEM_DISABLED) != -1) {
                return;//return if item is disabled
            }
            if (e.shiftKey && !!self.selectedItem) {

            } else {
                if (self.selectedItem) {
                self.selectedItem.className = self.selectedItem.className.replace(self._STYLE_ITEM_SELECTED, '');
                }
                target.className = target.className +' '+ self._STYLE_ITEM_SELECTED;
                self.selectedItem = target;
            }
        }
    }
    albatross.infiniteList.prototype.updateView = function (fromIdx, toIdx) {
        var data = this.config.data.slice(fromIdx, toIdx), domBatch = [], str = '';
        for (var i = 0; i < data.length; i++) {
//            var li = document.createElement('li');
//            var textNode = document.createTextNode(this.getText(data[i]));
//            li.appendChild(textNode);
//            domBatch.push(li);
            str += this.createElement(data[i]);
        }
        this.element.innerHTML = str;
    }

    albatross.infiniteList.prototype.createElement = function (dataItem) {
        return '<li class="' + this.getClass(dataItem) + '">' + this.getText(dataItem) + '</li>';
    }
    albatross.infiniteList.prototype.getClass = function (dataItem) {
        return dataItem[this.config.schema.enabled] ? this._STYLE_ITEM_ENABLED : this._STYLE_ITEM_DISABLED;
    }
    albatross.infiniteList.prototype.getText = function (dataItem) {
        return dataItem[this.config.schema.name];
    }

    albatross.infiniteList.prototype.checkConfig = function () {
        if (!this.config.hasOwnProperty('elementId')) {
            throw ("Must supply element ID");
        }
    }

    return window.albatross = albatross;
}
    (window));