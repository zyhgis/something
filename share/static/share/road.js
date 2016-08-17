/**
 * 
 */

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var overlayPopup = new ol.Overlay({
  element: container
  });
var baseLayer = new ol.layer.Group({
	'title': 'Base maps',
	layers: [new ol.layer.Tile({title: 'BingMap',
	        	 source: new ol.source.BingMaps({key:'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3', imagerySet: 'Aerial'})}),
	         new ol.layer.Tile({title: 'OSM', source: new ol.source.OSM()}),
	        ]});
// var source = new ol.source.Vector({wrapX: false});
var vector = new ol.layer.Vector({
  source: new ol.source.GeoJSON({url: '/static/share/sheng.geojson',}),
  title:'China',
});
// var vector2 = new ol.layer.Vector({
//   source: new ol.source.Vector({
//     url: '/static/share/doc.kml',
//   format:new ol.format.KML()
//   }),
//   title:'ChinaKML',
// });
 var vector2 = new ol.layer.Vector({
        source: new ol.source.Vector({
          url:'/static/share/doc.kml',
          format: new ol.format.KML()
        }),
        title:'ChinaKML',
      });
var projection = ol.proj.get('EPSG:3857');
var map = new ol.Map({
    controls: ol.control.defaults().extend([
      new ol.control.ZoomSlider({}),
      new ol.control.ScaleLine({}),
      new ol.control.MousePosition({}),
      new ol.control.LayerSwitcher({tipLabel: "Layers"}),
     // new ol.control.EditingToolbar(vector),
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: [baseLayer,vector,vector2],
    view: new ol.View({
      projection: projection,
       maxZoom: 28, minZoom: 1
    })
  });
	map.getView().fitExtent([12939751.984392596, 4852335.662490146,
	                         12940527.854120726, 4853386.618642847], map.getSize());
	
	var closer = document.getElementById('popup-closer');
    closer.onclick = function() {
      container.style.display = 'none';
      closer.blur();
      return false;
    };
    var doHighlight = true;
    var doHover = false;
    var highlight;
    var featureOverlay = new ol.FeatureOverlay({
        map: map,
        style: [new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgba(100,255,100,1)',
                width: 2
              }),
              fill: new ol.style.Fill({
                color: 'rgba(0,255,0,0.5)'
              }),
              })]          
      });
    var onPointerMove = function(evt) {
        if (!doHover && !doHighlight){
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        var coord = evt.coordinate;
        var popupField;
        var popupText = '';
        var currentFeature;
        var currentFeatureKeys;
        map.forEachFeatureAtPixel(pixel, function(feature, layer) {
          currentFeature = feature;
          currentFeatureKeys = currentFeature.getKeys();
                    
        });

        if (doHighlight){
          if (currentFeature !== highlight) {
            if (highlight) {
              featureOverlay.removeFeature(highlight);
            }
            if (currentFeature) {
              featureOverlay.addFeature(currentFeature);
            }
            highlight = currentFeature;
          }
        }

      };
      var fidsobj;
	var onSingleClick = function(evt) {
        var pixel = map.getEventPixel(evt.originalEvent);
        var coord = evt.coordinate;
        var popupField = "";
        var popupText = "";
        var fname = document.getElementById('fname');
        var currentFeature;
        var currentFeatureKeys;
        map.forEachFeatureAtPixel(pixel, function(feature, layer) {
          currentFeature = feature;
          currentFeatureKeys = currentFeature.getKeys();
            for ( var i=0; i<currentFeatureKeys.length;i++) {
                if (currentFeatureKeys[i] != 'geometry') {
                	 popupField = currentFeatureKeys[i] + currentFeature.get(currentFeatureKeys[i]);
                     popupText = popupText + popupField;
                     if(currentFeatureKeys[i] == "name") {
                        fname.innerHTML = currentFeature.get(currentFeatureKeys[i]);
//                    	 fidsobj=$.ajax({url:"http://localhost:8080/myucas/Test?fname=" + currentFeatureKeys[i], async:false, error:function (data, status, e) {alert("奇了怪，服务器没响应！");}});
//                    	 responsetext = fidsobj.responseText;
//                         alert(responsetext);
                     }
                }
            }
              
        });
        if (popupText) {
            overlayPopup.setPosition(coord);
            container.style.display = 'block';        
        } else {
          container.style.display = 'none';
        }
      };
      map.on('pointermove', function(evt) {
          onPointerMove(evt);
        });
      map.on('singleclick', function(evt) {
          onSingleClick(evt);
        });
      var sfstyle = [new ol.style.Style({
          stroke: new ol.style.Stroke({color: 'rgba(235,235,235,1)',width: 1}),
          fill: new ol.style.Fill({color: 'rgba(100,150,200,1)'}),
          })]
  	 var unsfstyle = [new ol.style.Style({
           stroke: new ol.style.Stroke({color: 'rgba(100,150,100,1)',width: 1}),
           fill: new ol.style.Fill({color: 'rgba(255,255,255,1)'}),
           })]
      
      $("#submit").click(function() {
    	  var objname = document.getElementById("objname").value;
    	  var lyr_qu = new ol.layer.Vector({
    			source: new ol.source.GeoJSON({url:'mian.geojson'}),
    			style:function() { 
          	    	return function(feature, resolution) {
          	    		if((feature.get("name").indexOf(objname))!=-1) {
          	    			return sfstyle;
          	    		} else {
          	    			return unsfstyle;
          	    		}
          	    	}
    			}(),
    		});
    	  map.addLayer(lyr_qu);
      })
      
      var typeSelect = document.getElementById('drawtype');

// var draw; 
// global so we can remove it later
// function addInteraction() {
//   var value = typeSelect.value;
//   if (value !== 'None') {
//     var geometryFunction, maxPoints;
//     if (value === 'Square') {
//       value = 'Circle';
//       geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
//     } else if (value === 'Box') {
//       value = 'LineString';
//       maxPoints = 2;
//       geometryFunction = function(coordinates, geometry) {
//         if (!geometry) {
//           geometry = new ol.geom.Polygon(null);
//         }
//         var start = coordinates[0];
//         var end = coordinates[1];
//         geometry.setCoordinates([
//           [start, [start[0], end[1]], end, [end[0], start[1]], start]
//         ]);
//         return geometry;
//       };
//     }
//     draw = new ol.interaction.Draw({
//       source: source,
//       type: /** @type {ol.geom.GeometryType} */ (value),
//       geometryFunction: geometryFunction,
//       maxPoints: maxPoints
//     });
//     map.addInteraction(draw);
//   }
// }


// /**
//  * Let user change the geometry type.
//  * @param {Event} e Change event.
//  */
// // typeSelect.onchange = function(e) {
// //   map.removeInteraction(draw);
// //   addInteraction();
// // };

// addInteraction();
