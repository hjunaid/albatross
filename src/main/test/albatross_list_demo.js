/**
 * @author: Junaid Malik
 */
(function demo(window) {
    var config = {
        elementId : 'infiniteList',
        data : getDummyData(),
        onSelect : onSelect,
        schema : {
            name : 'name',
            enabled : 'enabled'
        }
    };

    function onSelect(item) {

    }

    var myList = new albatross.infiniteList(config);

    function Server(name, enabled) {
        this.name = name;
        this.enabled = enabled;
    }

    function getDummyData() {
        var arr = [];
        for (var i = 0; i < 1000; i++) {
            var enabled = Math.floor(Math.random() * 2);
            arr.push(new Server('Server' + i,  Boolean(enabled)))
        }
        return arr;
    }
}
    (window));