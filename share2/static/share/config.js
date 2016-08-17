var map;
var untiled;
var tiled;

function init() {

    format = 'image/png';

    //default bounds of tongji
    var bounds = new ol.Bounds(
	    116.246640,39.90719,116.2530,39.911386);

    var options = {
        controls: [],
        projection: new ol.Projection("EPSG:900913"),
        displayProjection: new ol.Projection('EPSG:4326'),
        units: "m",
        maxResolution: 156543.0339,
        maxExtent: new ol.Bounds(-20037508.34, -20037508.34,
           20037508.34, 20037508.34)
    };
    map = new ol.Map('map', options);

    // create　and add Google Mercator layers
    var gphy = new ol.layer.Google(
        "　Google Physical",
        {type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 22}
        );
    var gmap = new ol.layer.Google(
        "　Google Streets",
        {numZoomLevels: 22}
        );
    var ghyb = new ol.layer.Google(
        "　Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22}
        );
    var gsat = new ol.layer.Google(
        "　Google Satellite",  // the default , no 偏移
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
        );

    map.addLayers([
         gphy, gsat,  gmap, ghyb
        ]);

    // add tongji layer
    xueyuan = new ol.layer.WMS("  学校道路", "http://localhost:8080/geoserver/ucas/wms", {
        LAYERS: 'road',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    daolu = new ol.layer.WMS("　道路", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:daolu',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    jiaoxuelou = new ol.layer.WMS("　教学楼", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:jiaoxuelou',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    lvhuadai = new ol.layer.WMS("　绿化带", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:lvhuadai',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    otherbuilding = new ol.layer.WMS("　其他建筑", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:otherbuilding',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    sanhaowu = new ol.layer.WMS("　三好坞", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:sanhaowu',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    shitang = new ol.layer.WMS("　食堂", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:shitang',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    shuiyu = new ol.layer.WMS("　水域", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:shuiyu',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    sushe = new ol.layer.WMS("　宿舍楼", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:sushe',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    yundongchang = new ol.layer.WMS("　运动场", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:yundongchang',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    zhongyaojianzhu = new ol.layer.WMS("　重要建筑", "http://localhost:8080/geoserver/tongji/wms", {
        LAYERS: 'tongji:zhongyaojianzhu',
        STYLES: '',
        format: format,
        tiled: true,
        transparent: "true",
    }, {
        opacity: 0.7,
        isBaseLayer: false
    });

    map.addLayers([xueyuan,daolu,jiaoxuelou,lvhuadai,otherbuilding,sanhaowu,shitang,sushe,yundongchang,zhongyaojianzhu]);

    var vector = new ol.layer.Vector("　编辑");
    map.addLayer(vector);

    // build up all controls
    map.addControl(new ol.Control.PanZoomBar({
        position: new ol.Pixel(2, 15)
    }));
    map.addControl(new ol.Control.Navigation());
    map.addControl(new ol.Control.Scale());
    map.addControl(new ol.Control.MousePosition());
    map.addControl(new ol.Control.LayerSwitcher());
    map.addControl(new ol.Control.EditingToolbar(vector));

    var fromProjection = new ol.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new ol.Projection("EPSG:900913"); // to Spherical Mercator Projection
    map.zoomToExtent(bounds.transform( fromProjection, toProjection));

    map.events.register("click", map, onMapClick);

}

function onMapClick(e){
    var params = {
        REQUEST:        "GetFeatureInfo",                // WMS GetFeatureInfo
        EXCEPTIONS:      "application/vnd.ogc.se_xml",    // Exception 类型
        BBOX:            map.getExtent().toBBOX(),       // 地图的地图范围
        SERVICE: "WMS",
        INFO_FORMAT: 'text/html',
        QUERY_LAYERS: 'tongji:xueyuan_google',
        FEATURE_COUNT: 50,
        Layers: 'tongji:xueyuan_google',
        WIDTH: map.size.w,
        HEIGHT: map.size.h,
        format: format,
        styles: "",
        srs: "EPSG:900913",
        X:               parseInt(e.xy.x),                         // 屏幕坐标X
        Y:               parseInt(e.xy.y)                         // 屏幕坐标X
    };
    ol.loadURL("http://localhost:8080/geoserver/tongji/wms?", params, this, onComplete, onFailure);
    ol.Event.stop(e);
}

function onComplete (response){
   document.getElementById('nodelist').innerHTML = response.responseText;
}

function onFailure (response){
   document.getElementById('nodelist').innerHTML = response.responseText;
}

function updateFilter(){
  var filterType = document.getElementById('filterType').value;
  var filter = document.getElementById('filter').value;

  var filterParams = {
    filter: null,
    cql_filter: null,
    featureId: null
};
if (ol.String.trim(filter) != "") {
    if (filterType == "cql")
        filterParams["cql_filter"] = filter;
    if (filterType == "ogc")
        filterParams["filter"] = filter;
    if (filterType == "fid")
        filterParams["featureId"] = filter;
}

mergeNewParams(filterParams);
}

function resetFilter() {
    document.getElementById('filter').value = "";
    updateFilter();
}

function mergeNewParams(params){
    xueyuan.mergeNewParams(params);
}
