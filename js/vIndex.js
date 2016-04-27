var map,
	activeLayers,
	skipSlider,
	playButton,
	pauseButton,
	refreshButton,
	skipValues,
	timestamp,
	layer,
	play,
	updateTimestamp;

L.mapbox.accessToken = 'pk.eyJ1IjoiZWNvbnciLCJhIjoiWUZxcXRMVSJ9.tmmSP9rEmDmhB54B8ARtQQ';

var southWest = L.latLng(44.5, -124.5),
    northEast = L.latLng(46.5, -120.9),
    bounds = L.latLngBounds(southWest, northEast);
    
map = L.mapbox.map('map', '',{
	maxBounds: bounds,
	maxZoom: 13,
	minZoom: 9

}).setView([45.5231, -122.6765], 10);



var group1990 = L.layerGroup();
	var layer1990 = L.mapbox.tileLayer('econw.2uqxcquy', {reuseTiles: true}).addTo(group1990);
	var grid1990 = L.mapbox.gridLayer('econw.2uqxcquy').addTo(group1990);

var group2000 = L.layerGroup();
	var layer2000 = L.mapbox.tileLayer('econw.dpydjpbt', {reuseTiles: true}).addTo(group2000);
	var grid2000 = L.mapbox.gridLayer('econw.dpydjpbt').addTo(group2000);

var group2009 = L.layerGroup();
	var layer2009 = L.mapbox.tileLayer('econw.9b8k6hox', {reuseTiles: true}).addTo(group2009);
	var grid2009 = L.mapbox.gridLayer('econw.9b8k6hox').addTo(group2009);

var group2010 = L.layerGroup();
	var layer2010 = L.mapbox.tileLayer('econw.bmobrpl4', {reuseTiles: true}).addTo(group2010);
	var grid2010 = L.mapbox.gridLayer('econw.bmobrpl4').addTo(group2010);

var group2011 = L.layerGroup();
	var layer2011 = L.mapbox.tileLayer('econw.9l95weq7', {reuseTiles: true}).addTo(group2011);
	var grid2011 = L.mapbox.gridLayer('econw.9l95weq7').addTo(group2011);

var group2012 = L.layerGroup();
	var layer2012 = L.mapbox.tileLayer('econw.0ptmwtk6', {reuseTiles: true}).addTo(group2012);
	var grid2012 = L.mapbox.gridLayer('econw.0ptmwtk6').addTo(group2012);

var group2013 = L.layerGroup();
	var layer2013 = L.mapbox.tileLayer('econw.53vdnrpt', {reuseTiles: true}).addTo(group2013);
	var grid2013 = L.mapbox.gridLayer('econw.53vdnrpt').addTo(group2013);

var group2014 = L.layerGroup();
	var layer2014 = L.mapbox.tileLayer('econw.4zt73kt0', {reuseTiles: true}).addTo(group2014);
	var grid2014 = L.mapbox.gridLayer('econw.4zt73kt0').addTo(group2014);

var group2015 = L.layerGroup();
	var layer2015 = L.mapbox.tileLayer('econw.20714ksw', {reuseTiles: true}).addTo(group2015);
	var grid2015 = L.mapbox.gridLayer('econw.20714ksw').addTo(group2015);

var group2016 = L.layerGroup();
	var layer2016 = L.mapbox.tileLayer('econw.315dyfs7', {reuseTiles: true}).addTo(group2016);
	var grid2016 = L.mapbox.gridLayer('econw.315dyfs7').addTo(group2016);

var group2017 = L.layerGroup();
	var layer2017 = L.mapbox.tileLayer('econw.dcyt5qvp', {reuseTiles: true}).addTo(group2017);
	var grid2017 = L.mapbox.gridLayer('econw.dcyt5qvp').addTo(group2017);

var group2018 = L.layerGroup();
	var layer2018 = L.mapbox.tileLayer('econw.7znr77li', {reuseTiles: true}).addTo(group2018);
	var grid2018 = L.mapbox.gridLayer('econw.7znr77li').addTo(group2018);

var group2019 = L.layerGroup();
	var layer2019 = L.mapbox.tileLayer('econw.57r6spx6', {reuseTiles: true}).addTo(group2019);
	var grid2019 = L.mapbox.gridLayer('econw.57r6spx6').addTo(group2019);

var group2020 = L.layerGroup();
	var layer2020 = L.mapbox.tileLayer('econw.48hicpvs', {reuseTiles: true}).addTo(group2020);
	var grid2020 = L.mapbox.gridLayer('econw.48hicpvs').addTo(group2020);


map.addControl(L.mapbox.gridControl(grid1990, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2000, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2009, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2010, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2011, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2012, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2013, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2014, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2015, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2016, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2017, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2018, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2019, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2020, {follow: true}));


//initial view
activeLayers = L.layerGroup().addTo(map);

group2000.addTo(activeLayers);
group2009.addTo(activeLayers);
group2010.addTo(activeLayers);
group2011.addTo(activeLayers);
group2012.addTo(activeLayers);
group2013.addTo(activeLayers);
group2014.addTo(activeLayers);
group2015.addTo(activeLayers);
group2016.addTo(activeLayers);
group2017.addTo(activeLayers);
group2018.addTo(activeLayers);
group2019.addTo(activeLayers);
group2020.addTo(activeLayers);

activeLayers.clearLayers();

group1990.addTo(activeLayers);


var basemap = L.mapbox.tileLayer("econw.0iw1bc23");	
basemap.addTo(map);
basemap.bringToFront();

skipSlider = document.getElementById('slider');
playButton = document.getElementById('vcr-play');
pauseButton = document.getElementById('vcr-pause');
refreshButton = document.getElementById('vcr-refresh');

noUiSlider.create(skipSlider, {
	animate: true,
	animationDuration: 3000,
	range: {
		'min': 1990,
		//skip
		'30%': 2000,
		//skip
		'56%': 2009,
		'60%': 2010,
		'64%': 2011,
		'68%': 2012,
		'72%': 2013,
		'76%': 2014,
		'80%': 2015,
		'84%': 2016,
		'88%': 2017,
		'92%': 2018,
		'96%': 2019,
		'max': 2020
	},
	snap: true,
	start: [1990],
	format: wNumb({
		decimals: 0
	})
});

skipValues = [
	document.getElementById('year-label'),
];



skipSlider.noUiSlider.on('update', function( values, handle ) {
	
	timestamp=Number(values[handle]);

	layer='group'+timestamp;
	
	skipValues[handle].innerHTML = values[handle];
	
	activeLayers.clearLayers();
	eval(layer).addTo(activeLayers);


});


playButton.addEventListener('click', function(){
	$('#vcr-play').addClass('active');
	play = setInterval(next, 5000);

});

pauseButton.addEventListener('click', function(){

	clearInterval(play);
	$('#vcr-play').removeClass('active');
});

refreshButton.addEventListener('click', function(){
	skipSlider.noUiSlider.set(1990);
	updateTimestamp = 1990;
	console.log(timestamp);
	console.log(updateTimestamp);

});



function next() {

	if (timestamp == 1990) {
	
	updateTimestamp = timestamp + 10;
	
	activeLayers.clearLayers();	
	
	eval(layer).addTo(activeLayers);
	skipSlider.noUiSlider.set(updateTimestamp);
	
	console.log(timestamp);
	console.log(updateTimestamp);
	

	} else if (timestamp == 2000){
 	updateTimestamp = timestamp + 9;
	
	activeLayers.clearLayers();	
	
	eval(layer).addTo(activeLayers);
	skipSlider.noUiSlider.set(updateTimestamp);

	console.log(timestamp);
	console.log(updateTimestamp);
	
	} else if (timestamp < 2020){
 	updateTimestamp = timestamp + 1;
	
	
	activeLayers.clearLayers();	
	
	eval(layer).addTo(activeLayers);
	skipSlider.noUiSlider.set(updateTimestamp);
	
	console.log(timestamp);
	console.log(updateTimestamp);

	
	} else {
	clearInterval(play);
	}
}



var uiControl = L.Control.extend({
	initialize: function (foo, options) {
		L.Util.setOptions(this, options);
	element = foo.replace('#','');
	},
	onAdd: function (map) {
		return L.DomUtil.get(element);
	}
});


map.addControl(new uiControl('#vcr-controls', { position: 'topright' }));





