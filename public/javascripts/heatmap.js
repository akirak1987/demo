const dims = {
  a0: [1189, 841],
  a1: [841, 594],
  a2: [594, 420],
  a3: [420, 297],
  a4: [297, 210],
  a5: [210, 148]
},
exportButton = $('#exportPdf'),
blur = $("#blur"),
radius = $("#radius"),
stat = $("#status"),
tile = $("#tile")
geojson = new ol.format.GeoJSON();

function addGeoHeader(data){
  return {
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:4326'
      }
    },
    'features': data
  }
}

$(function(){
  $.ajax({
    url: '/demo1/records/0',
    type: 'GET',
  }).done((data) => {
    let heatMapSource = new ol.source.Vector({
      features: geojson.readFeatures(addGeoHeader(data))
    }),
    raster = new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'toner'
      })
    }),
    vector = new ol.layer.Heatmap({
      source: heatMapSource
    }),
    map = new ol.Map({
      layers: [raster,vector],
      target: 'map',
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [0,0],
        zoom: 2
      })
    });
    //add eventListener
    blur.on('change', () => {
      vector.setBlur(parseInt(blur.val(), 10));
    });

    radius.on('change', () => {
      vector.setRadius(parseInt(radius.val(), 10));
    });

    tile.on('change', () => {
      if(tile.val() === 'Stamen'){
        raster.setSource(
          new ol.source.Stamen({
            layer: 'toner'
          })
        );
      }else if(tile.val() === 'OSM'){
        raster.setSource(
          new ol.source.OSM()
        );
      }
    });
    stat.on('change', () => {
      let url = '/demo1/records/';
      if(stat.val() === ""){
        url += '0';
      }else{
        url += stat.val();
      }
      $.ajax({
        url: url,
        type: 'GET',
      }).done((data) => {
        heatMapSource.clear(true);
        heatMapSource.addFeatures(geojson.readFeatures(addGeoHeader(data)));
      }).fail((jqXHR,textStatus,errorThrown) => {
        console.log('error status:' + jqXHR.status);
      });
    });
    exportButton.on('click', () =>{
      exportButton.disabled = true;
      let format = $('#format').val(),
      resolution = $('#resolution').val(),
      dim = dims[format],
      width = Math.round(dim[0] * resolution / 25.4),
      height = Math.round(dim[1] * resolution / 25.4),
      size = map.getSize(),
      extent = map.getView().calculateExtent(size);
      map.once('rendercomplete',(event) => {
        let canvas = event.context.canvas,
        data = canvas.toDataURL('image/jpeg'),
        pdf = new jsPDF('landscape', undefined, format);
        pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
        pdf.save('map.pdf');
        map.setSize(size);
        map.getView().fit(extend, {size: size});
        exportButton.disabled = false;
      });
      let printSize = [width, height];
      map.setSize(printSize);
      map.getView().fit(extent,{size: printSize});
    });
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.log('error status:' + jqXHR.status);
  });
});

