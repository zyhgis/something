/**
 * 
 */
function init() {
var baseLayer = new ol.layer.Group({
	'title': 'Base maps',
	layers: [new ol.layer.Tile({title: 'OSM', source: new ol.source.OSM()}),
	         new ol.layer.Tile({title: 'BingMap',
	        	 source: new ol.source.BingMaps({key:'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3', imagerySet: 'Aerial'})
			}),
	        ]});
var lyr_r = new ol.layer.Vector({
	source: new ol.source.GeoJSON({url:'road.geojson'}),
	title:'Roads',
	style: new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(100,155,100,1)", width: 1}), 
        fill: new ol.style.Fill({color: "rgba(255,255,255,0.3)"})
    }),
});

lyr_r.setVisible(true);
var layersList = [baseLayer,lyr_r];


var map = new ol.Map({
    controls: ol.control.defaults().extend([
      new ol.control.ZoomSlider({}),
      new ol.control.ScaleLine({}),
      new ol.control.LayerSwitcher({tipLabel: "Layers"}),
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    layers: [layersList],
    view: new ol.View({
       maxZoom: 28, minZoom: 1
    })
  });
	map.getView().fitExtent([234.05188679245285, -404.1462264150944,603.5330188679245, -119.85377358490574], map.getSize());
}