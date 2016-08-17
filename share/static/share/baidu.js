/**
 * 
 * 
 *
 */
var lyr_r = new ol.layer.Vector({
	source: new ol.source.GeoJSON({url:'road.geojson'}),
	title:'Roads',
	style: new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(100,155,100,1)", width: 1}), 
        fill: new ol.style.Fill({color: "rgba(255,255,255,0.3)"})
    }),
});
var map = new BMap.Map("maincontent");          // 创建地图实例  
            var point = new BMap.Point(116.255161,39.915797);  // 创建点坐标  
            map.centerAndZoom(point, 18);  
            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);    
            map.addTileLayer(lyr_r);