//联系我们展示宝尊位置的代码
/*var map1 = new BMap.Map("allmap1");
map1.centerAndZoom(new BMap.Point(121.446517, 31.299467), 20);
var marker1 = new BMap.Marker(new BMap.Point(121.446517, 31.299467)); // 创建点
map1.addOverlay(marker1);
map1.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放*/

//定点门店关于门店展示的代码

/*var map2 = new BMap.Map("allmap2");
map2.centerAndZoom(new BMap.Point(121.446517, 31.299467), 20);
var marker2 = new BMap.Marker(new BMap.Point(121.446517, 31.299467)); // 创建点
map2.addOverlay(marker2);
map2.enableScrollWheelZoom(true);*/

define(['jquery'],function($){
    var _carcareMap = function(opt){
        opt = opt||{};
        this.opt = opt;
        if(!opt.id){
            return false;
        }
        if(!opt.currentLon&&!opt.currentLat){
            return false;
        }
        opt.zoom = opt.zoom||12;

        this._init();

    };
    _carcareMap.prototype = {
        _init: function () {
            var _self = this;
            var map = new BMap.Map(this.opt.id);
            map.centerAndZoom(new BMap.Point(this.opt.currentLon, this.opt.currentLat), this.opt.zoom);

            this._map = map;
        },
        enableScroll: function(){
            this._map.enableScrollWheelZoom(true);
        },
        addOneMaker: function(lon,lat){
            //new BMap.Point(121.446517, 31.299467)
            var marker = new BMap.Marker(new BMap.Point(lon, lat)); // 创建点
            this._map.addOverlay(marker);
        },
        addArrayMaker: function(array){
            for(var i = 0; i < array.length; i++){
                var item = array[i];
                var marker = new BMap.Marker(new BMap.Point(item.lon, item.lat));// 创建点
                this._map.addOverlay(marker);
            }
        }
    };
    return _carcareMap;
});
