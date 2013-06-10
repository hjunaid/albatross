/**
 * @author: Junaid Malik
 */
(function InfiniteList(window) {
    var albatross = {};
    albatross.infiniteList = function (config) {
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

    albatross.infiniteList.prototype.addListeners= function(){
        this.element.addEventListener('click',function(e){

        },false)
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
        return '<li class="' + this.getClass(dataItem) + '">' + this.getText(dataItem) + '</li>' ;
    }
    albatross.infiniteList.prototype.getClass = function (dataItem) {
        return dataItem[this.config.schema.enabled] ? 'a-enabled' : 'a-disabled';
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