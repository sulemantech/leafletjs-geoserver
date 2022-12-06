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


