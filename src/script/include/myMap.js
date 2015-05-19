require(['widget/map'],function(carcareMap){
    var mapId = document.getElementById('allmap1');
    if(mapId){
        var contactMap = new carcareMap({
            id: 'allmap1',
            currentLon: 121.446517,
            currentLat: 31.299467,
            zoom: 20
        });
        contactMap.addOneMaker(121.446517, 31.299467);
        contactMap.enableScroll();
    }else{
        var storeMap = new carcareMap({
            id: 'allmap2',
            currentLon: 121.446517,
            currentLat: 31.299467
        });
        storeMap.addOneMaker(121.446517, 31.299467);
        storeMap.enableScroll();
    }
});
