function loadVulnerability(){


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
map.addControl(new uiControl('#slider', { position: 'topright' }));
map.addControl(new uiControl('#year-label', { position: 'topright' }));
map.addControl(new uiControl('#menu-toggle', { position: 'topleft' }));
map.addControl(new uiControl('#legend', { position: 'bottomleft' }));

}

function loadOwnership(){


var group1990 = L.layerGroup();
	var layer1990 = L.mapbox.tileLayer('econw.1suja3gi', {reuseTiles: true}).addTo(group1990);
	var grid1990 = L.mapbox.gridLayer('econw.1suja3gi').addTo(group1990);

var group2000 = L.layerGroup();
	var layer2000 = L.mapbox.tileLayer('econw.8qqtzatk', {reuseTiles: true}).addTo(group2000);
	var grid2000 = L.mapbox.gridLayer('econw.8qqtzatk').addTo(group2000);

var group2009 = L.layerGroup();
	var layer2009 = L.mapbox.tileLayer('econw.7r3wsdmt', {reuseTiles: true}).addTo(group2009);
	var grid2009 = L.mapbox.gridLayer('econw.7r3wsdmt').addTo(group2009);

var group2010 = L.layerGroup();
	var layer2010 = L.mapbox.tileLayer('econw.0odh3ggv', {reuseTiles: true}).addTo(group2010);
	var grid2010 = L.mapbox.gridLayer('econw.0odh3ggv').addTo(group2010);

var group2011 = L.layerGroup();
	var layer2011 = L.mapbox.tileLayer('econw.6ikn74cq', {reuseTiles: true}).addTo(group2011);
	var grid2011 = L.mapbox.gridLayer('econw.6ikn74cq').addTo(group2011);

var group2012 = L.layerGroup();
	var layer2012 = L.mapbox.tileLayer('econw.7r2v0egz', {reuseTiles: true}).addTo(group2012);
	var grid2012 = L.mapbox.gridLayer('econw.7r2v0egz').addTo(group2012);

var group2013 = L.layerGroup();
	var layer2013 = L.mapbox.tileLayer('econw.3hh5vaqz', {reuseTiles: true}).addTo(group2013);
	var grid2013 = L.mapbox.gridLayer('econw.3hh5vaqz').addTo(group2013);

var group2014 = L.layerGroup();
	var layer2014 = L.mapbox.tileLayer('econw.aynrxza7', {reuseTiles: true}).addTo(group2014);
	var grid2014 = L.mapbox.gridLayer('econw.aynrxza7').addTo(group2014);

var group2015 = L.layerGroup();
	var layer2015 = L.mapbox.tileLayer('econw.4egdo2dc', {reuseTiles: true}).addTo(group2015);
	var grid2015 = L.mapbox.gridLayer('econw.4egdo2dc').addTo(group2015);

var group2016 = L.layerGroup();
	var layer2016 = L.mapbox.tileLayer('econw.7rf0cezu', {reuseTiles: true}).addTo(group2016);
	var grid2016 = L.mapbox.gridLayer('econw.7rf0cezu').addTo(group2016);

var group2017 = L.layerGroup();
	var layer2017 = L.mapbox.tileLayer('econw.32j5xo88', {reuseTiles: true}).addTo(group2017);
	var grid2017 = L.mapbox.gridLayer('econw.32j5xo88').addTo(group2017);

var group2018 = L.layerGroup();
	var layer2018 = L.mapbox.tileLayer('econw.7dkx9f6t', {reuseTiles: true}).addTo(group2018);
	var grid2018 = L.mapbox.gridLayer('econw.7dkx9f6t').addTo(group2018);

var group2019 = L.layerGroup();
	var layer2019 = L.mapbox.tileLayer('econw.a9c3iadh', {reuseTiles: true}).addTo(group2019);
	var grid2019 = L.mapbox.gridLayer('econw.a9c3iadh').addTo(group2019);

var group2020 = L.layerGroup();
	var layer2020 = L.mapbox.tileLayer('econw.ctsm93e5', {reuseTiles: true}).addTo(group2020);
	var grid2020 = L.mapbox.gridLayer('econw.ctsm93e5').addTo(group2020);


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
map.addControl(new uiControl('#slider', { position: 'topright' }));
map.addControl(new uiControl('#year-label', { position: 'topright' }));
map.addControl(new uiControl('#menu-toggle', { position: 'topleft' }));


}

function loadAffordability() {

var group2000 = L.layerGroup();
	var layer2000 = L.mapbox.tileLayer('econw.8vlktf0l', {reuseTiles: true}).addTo(group2000);
	var grid2000 = L.mapbox.gridLayer('econw.8vlktf0l').addTo(group2000);
	
var group2001 = L.layerGroup();
	var layer2001 = L.mapbox.tileLayer('econw.anq7adx3', {reuseTiles: true}).addTo(group2001);
	var grid2001 = L.mapbox.gridLayer('econw.anq7adx3').addTo(group2001);
	
var group2002 = L.layerGroup();
	var layer2002 = L.mapbox.tileLayer('econw.3olmnrr1', {reuseTiles: true}).addTo(group2002);
	var grid2002 = L.mapbox.gridLayer('econw.3olmnrr1').addTo(group2002);

var group2003 = L.layerGroup();
	var layer2003 = L.mapbox.tileLayer('econw.4pmvm5o0', {reuseTiles: true}).addTo(group2003);
	var grid2003 = L.mapbox.gridLayer('econw.4pmvm5o0').addTo(group2003);

var group2004 = L.layerGroup();
	var layer2004 = L.mapbox.tileLayer('econw.16g6sqbk', {reuseTiles: true}).addTo(group2004);
	var grid2004 = L.mapbox.gridLayer('econw.16g6sqbk').addTo(group2004);

var group2005 = L.layerGroup();
	var layer2005 = L.mapbox.tileLayer('econw.2aoqd8h0', {reuseTiles: true}).addTo(group2005);
	var grid2005 = L.mapbox.gridLayer('econw.2aoqd8h0').addTo(group2005);

var group2006 = L.layerGroup();
	var layer2006 = L.mapbox.tileLayer('econw.1ysw0xv2', {reuseTiles: true}).addTo(group2006);
	var grid2006 = L.mapbox.gridLayer('econw.1ysw0xv2').addTo(group2006);

var group2007 = L.layerGroup();
	var layer2007 = L.mapbox.tileLayer('econw.6bnl5ub2', {reuseTiles: true}).addTo(group2007);
	var grid2007 = L.mapbox.gridLayer('econw.6bnl5ub2').addTo(group2007);

var group2008 = L.layerGroup();
	var layer2008 = L.mapbox.tileLayer('econw.c7ijejf6', {reuseTiles: true}).addTo(group2008);
	var grid2008 = L.mapbox.gridLayer('econw.c7ijejf6').addTo(group2008);
				
var group2009 = L.layerGroup();
	var layer2009 = L.mapbox.tileLayer('econw.ae1rrozn', {reuseTiles: true}).addTo(group2009);
	var grid2009 = L.mapbox.gridLayer('econw.ae1rrozn').addTo(group2009);

var group2010 = L.layerGroup();
	var layer2010 = L.mapbox.tileLayer('econw.87egr8iu', {reuseTiles: true}).addTo(group2010);
	var grid2010 = L.mapbox.gridLayer('econw.87egr8iu').addTo(group2010);

var group2011 = L.layerGroup();
	var layer2011 = L.mapbox.tileLayer('econw.64fj96mb', {reuseTiles: true}).addTo(group2011);
	var grid2011 = L.mapbox.gridLayer('econw.64fj96mb').addTo(group2011);

var group2012 = L.layerGroup();
	var layer2012 = L.mapbox.tileLayer('econw.04ps4ckf', {reuseTiles: true}).addTo(group2012);
	var grid2012 = L.mapbox.gridLayer('econw.04ps4ckf').addTo(group2012);

var group2013 = L.layerGroup();
	var layer2013 = L.mapbox.tileLayer('econw.ba8x3ze3', {reuseTiles: true}).addTo(group2013);
	var grid2013 = L.mapbox.gridLayer('econw.ba8x3ze3').addTo(group2013);

var group2014 = L.layerGroup();
	var layer2014 = L.mapbox.tileLayer('econw.bdufcgsz', {reuseTiles: true}).addTo(group2014);
	var grid2014 = L.mapbox.gridLayer('econw.bdufcgsz').addTo(group2014);

/*
var group2015 = L.layerGroup();
	var layer2015 = L.mapbox.tileLayer('econw.4egdo2dc', {reuseTiles: true}).addTo(group2015);
	var grid2015 = L.mapbox.gridLayer('econw.4egdo2dc').addTo(group2015);

var group2016 = L.layerGroup();
	var layer2016 = L.mapbox.tileLayer('econw.7rf0cezu', {reuseTiles: true}).addTo(group2016);
	var grid2016 = L.mapbox.gridLayer('econw.7rf0cezu').addTo(group2016);

var group2017 = L.layerGroup();
	var layer2017 = L.mapbox.tileLayer('econw.32j5xo88', {reuseTiles: true}).addTo(group2017);
	var grid2017 = L.mapbox.gridLayer('econw.32j5xo88').addTo(group2017);

var group2018 = L.layerGroup();
	var layer2018 = L.mapbox.tileLayer('econw.7dkx9f6t', {reuseTiles: true}).addTo(group2018);
	var grid2018 = L.mapbox.gridLayer('econw.7dkx9f6t').addTo(group2018);

var group2019 = L.layerGroup();
	var layer2019 = L.mapbox.tileLayer('econw.a9c3iadh', {reuseTiles: true}).addTo(group2019);
	var grid2019 = L.mapbox.gridLayer('econw.a9c3iadh').addTo(group2019);

var group2020 = L.layerGroup();
	var layer2020 = L.mapbox.tileLayer('econw.ctsm93e5', {reuseTiles: true}).addTo(group2020);
	var grid2020 = L.mapbox.gridLayer('econw.ctsm93e5').addTo(group2020);
*/

map.addControl(L.mapbox.gridControl(grid2000, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2001, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2002, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2003, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2004, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2005, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2006, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2007, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2008, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2009, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2010, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2011, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2012, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2013, {follow: true}));
map.addControl(L.mapbox.gridControl(grid2014, {follow: true}));
//map.addControl(L.mapbox.gridControl(grid2015, {follow: true}));
//map.addControl(L.mapbox.gridControl(grid2016, {follow: true}));
//map.addControl(L.mapbox.gridControl(grid2017, {follow: true}));
//map.addControl(L.mapbox.gridControl(grid2018, {follow: true}));
//map.addControl(L.mapbox.gridControl(grid2019, {follow: true}));
//map.addControl(L.mapbox.gridControl(grid2020, {follow: true}));


//initial view
activeLayers = L.layerGroup().addTo(map);

group2000.addTo(activeLayers);
group2001.addTo(activeLayers);
group2002.addTo(activeLayers);
group2003.addTo(activeLayers);
group2004.addTo(activeLayers);
group2005.addTo(activeLayers);
group2006.addTo(activeLayers);
group2007.addTo(activeLayers);
group2008.addTo(activeLayers);
group2009.addTo(activeLayers);
group2010.addTo(activeLayers);
group2011.addTo(activeLayers);
group2012.addTo(activeLayers);
group2013.addTo(activeLayers);
group2014.addTo(activeLayers);
//group2015.addTo(activeLayers);
//group2016.addTo(activeLayers);
//group2017.addTo(activeLayers);
//group2018.addTo(activeLayers);
//group2019.addTo(activeLayers);
//group2020.addTo(activeLayers);

activeLayers.clearLayers();

group2000.addTo(activeLayers);


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
		'min': 2000,
		'7%': 2001,
		'14%': 2002,
		'21%': 2003,
		'28%': 2004,
		'35%': 2005,
		'42%': 2006,
		'49%': 2007,
		'56%': 2008,
		'63%': 2009,
		'70%': 2010,
		'77%': 2011,
		'84%': 2012,
		'91%': 2013,
		'max': 2014
	},
	snap: true,
	start: [2000],
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
	skipSlider.noUiSlider.set(2000);
	updateTimestamp = 2000;
	console.log(timestamp);
	console.log(updateTimestamp);

});



function next() {

	if (timestamp < 2014){
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
map.addControl(new uiControl('#slider', { position: 'topright' }));
map.addControl(new uiControl('#year-label', { position: 'topright' }));
map.addControl(new uiControl('#menu-toggle', { position: 'topleft' }));



}




