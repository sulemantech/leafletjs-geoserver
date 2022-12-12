var vectorTileStyling = {

    water: {
        fill: true,
        weight: 1,
        fillColor: '#06cccc',
        color: '#06cccc',
        fillOpacity: 0.2,
        opacity: 0.4,
    },
    admin: {
        weight: 1,
        fillColor: 'pink',
        color: 'pink',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    waterway: {
        weight: 1,
        fillColor: '#2375e0',
        color: '#2375e0',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    landcover: {
        fill: true,
        weight: 1,
        fillColor: '#53e033',
        color: '#53e033',
        fillOpacity: 0.2,
        opacity: 0.4,
    },
    landuse: {
        fill: true,
        weight: 1,
        fillColor: '#e5b404',
        color: '#e5b404',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    park: {
        fill: true,
        weight: 1,
        fillColor: '#84ea5b',
        color: '#84ea5b',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    boundary: {
        weight: 1,
        fillColor: '#c545d3',
        color: '#c545d3',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    aeroway: {
        weight: 1,
        fillColor: '#51aeb5',
        color: '#51aeb5',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    road: {	// mapbox & nextzen only
        weight: 1,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    tunnel: {	// mapbox only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
// 					dashArray: [4, 4]
    },
    bridge: {	// mapbox only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
// 					dashArray: [4, 4]
    },
    transportation: {	// openmaptiles only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
// 					dashArray: [4, 4]
    },
    transit: {	// nextzen only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
// 					dashArray: [4, 4]
    },
    building: {
        fill: true,
        weight: 1,
        fillColor: '#2b2b2b',
        color: '#2b2b2b',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    water_name: {
        weight: 1,
        fillColor: '#022c5b',
        color: '#022c5b',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    transportation_name: {
        weight: 1,
        fillColor: '#bc6b38',
        color: '#bc6b38',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    place: {
        weight: 1,
        fillColor: '#f20e93',
        color: '#f20e93',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    housenumber: {
        weight: 1,
        fillColor: '#ef4c8b',
        color: '#ef4c8b',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    poi: {
        weight: 1,
        fillColor: '#3bb50a',
        color: '#3bb50a',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    earth: {	// nextzen only
        fill: true,
        weight: 1,
        fillColor: '#c0c0c0',
        color: '#c0c0c0',
        fillOpacity: 0.2,
        opacity: 0.4
    },


    // Do not symbolize some stuff for mapbox
    country_label: [],
    marine_label: [],
    state_label: [],
    place_label: [],
    waterway_label: [],
    poi_label: [],
    road_label: [],
    housenum_label: [],


    // Do not symbolize some stuff for openmaptiles
    country_name: [],
    marine_name: [],
    state_name: [],
    place_name: [],
    waterway_name: [],
    poi_name: [],
    road_name: [],
    housenum_name: [],
};

// Monkey-patch some properties for nextzen layer names, because
// instead of "building" the data layer is called "buildings" and so on
vectorTileStyling.buildings  = vectorTileStyling.building;
vectorTileStyling.boundaries = vectorTileStyling.boundary;
vectorTileStyling.places     = vectorTileStyling.place;
vectorTileStyling.pois       = vectorTileStyling.poi;
vectorTileStyling.roads      = vectorTileStyling.road;

let littleton = L.marker([49.6875,7.1651]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([49.6175,7.1551]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([49.6575,7.1751]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([49.6475,7.1451]).bindPopup('This is Golden, CO.');

    let cities = L.layerGroup([littleton, denver, aurora, golden]);

let osmLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

let map = L.map('map', {
    zoomControl: true,
    center: [49.6475,7.1651],
    zoom: 15,
    layers: [osmLayer, cities]
});

//
let overlayMaps = {
    "Cities": cities
};

let layerControl = L.control.layers( overlayMaps).addTo(map);

const crownHill = L.marker([49.6875,7.3651]).bindPopup('This is Crown Hill Park.');
const rubyHill = L.marker([49.6875,7.5651]).bindPopup('This is Ruby Hill Park.');
const parks = L.layerGroup([crownHill, rubyHill]);
//
//feeder
let feederClusters = L.Geoserver.wms("http://localhost:8086/geoserver/netzplan/wms", {
  layers: `netzplan:OUT_FeederClusters`,
});
feederClusters.addTo(map);
layerControl.addOverlay(feederClusters, 'Feeders');


//distribution
let distributionClusters = L.Geoserver.wms("http://localhost:8086/geoserver/netzplan/wms", {
  layers: `netzplan:netzplan:OUT_DistributionClusters`,
});
distributionClusters.addTo(map);
layerControl.addOverlay(distributionClusters, 'Distribution Clusters');

//primary distribution
let primeDistributionClusters = L.Geoserver.wms("http://localhost:8086/geoserver/netzplan/wms", {
  layers: `netzplan:OUT_PrimDistributionClusters`,
});
primeDistributionClusters.addTo(map);
layerControl.addOverlay(primeDistributionClusters, 'PD Clutsters');

//primary distribution cables
let primeDistributionCables = L.Geoserver.wms("http://localhost:8086/geoserver/netzplan/wms", {
  layers: `netzplan:OUT_PrimDistributionCables`,
});
primeDistributionCables.addTo(map);
layerControl.addOverlay(primeDistributionCables, 'PD Cables');

//wms
let buildings = L.Geoserver.wms("http://localhost:8086/geoserver/netzplan/wms", {
  layers: `netzplan:IN_Buildings`,
});
buildings.addTo(map);

layerControl.addOverlay(buildings, 'Buildings');

let demandPoints = L.Geoserver.wms("http://localhost:8086/geoserver/netzplan/wms", {
  layers: `netzplan:OUT_DemandPoints`,
});
demandPoints.addTo(map);
layerControl.addOverlay(demandPoints, 'Demand Points');


let distributionCables = L.Geoserver.wms("http://localhost:8086/geoserver/netzplan/wms", {
  layers: `netzplan:OUT_DistributionCables`,
});
distributionCables.addTo(map);
layerControl.addOverlay(distributionCables, 'Distribution Cables');

//var mb = L.tileLayer.mbTiles('trails.mbtiles').addTo(map);

// Assumes layers = "all", and format = "mvt"
var nextzenTilesUrl = "https://tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt?api_key={apikey}";

var nextzenVectorTileOptions = {
    rendererFactory: L.canvas.tile,
    attribution: '<a href="https://nextzen.com/">&copy; NextZen</a>, <a href="http://www.openstreetmap.org/copyright">&copy; OpenStreetMap</a> contributors',
    vectorTileLayerStyles: vectorTileStyling,
    apikey: 'gCZXZglvRQa6sB2z7JzL1w',
};

var nextzenTilesPbfLayer = L.vectorGrid.protobuf(nextzenTilesUrl, nextzenVectorTileOptions);
