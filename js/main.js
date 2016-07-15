 //load global variables
    var map,
	activeLayers,
	skipSlider,
	playButton,
	pauseButton,
	refreshButton,
	skipValues,
	timestamp,
	timestampShort,
	layer,
	play,
	updateTimestamp;
	
	//load mapbox access
	L.mapbox.accessToken = 'pk.eyJ1IjoiZWNvbnciLCJhIjoiWUZxcXRMVSJ9.tmmSP9rEmDmhB54B8ARtQQ';

	//set bounds for restricted panning
	var southWest = L.latLng(45.043598, -123.440661),
    	northEast = L.latLng(46.023814, -122.013812),
    	bounds = L.latLngBounds(southWest, northEast);
    //set map options
	map = L.mapbox.map('map', '',{
		maxBounds: bounds,
		maxZoom: 13,
		minZoom: 9

	}).setView([45.467021, -122.675738], 10);

	//add map controls
	var uiControl = L.Control.extend({
	initialize: function (foo, options) {
		L.Util.setOptions(this, options);
	element = foo.replace('#','');
	},
	onAdd: function (map) {
		return L.DomUtil.get(element);
	}
	});

	//add play, pause, refrest buttons
	map.addControl(new uiControl('#vcr-controls', { position: 'topright' }));
	//add slider 
	map.addControl(new uiControl('#slider', { position: 'topright' }));
	//add slider label
	map.addControl(new uiControl('#year-label', { position: 'topright' }));
	//add toggle
	//map.addControl(new uiControl('#affdButton', { position: 'topleft' }));
	//add refresh map view button
	map.addControl(new uiControl('#homeButton', { position: 'topleft' }));
	//add maps menu
	map.addControl(new uiControl('#map-menu', { position: 'topleft' }));

	//funtionality for refreshing map view
	$("#homeButton").click(function() {
		map.setView([45.467021, -122.675738], 10);
	});

	//add separate pane so that the "basemap" loads on top of the other layers
	var topBasemap = map._createPane('leaflet-top-pane', map.getPanes().mapPane);
    var labels = L.mapbox.tileLayer('econw.0iw1bc23').addTo(map);
    topBasemap.appendChild(labels.getContainer());
    //zindex level sets this layer above geojsons but below any popups
    labels.setZIndex(7);
    
    //define layer group for changing out different geojson layers
	activeLayers = L.layerGroup().addTo(map);

	//define census tract layer for tooltips
	var cTract = omnivore.topojson('./data/ctract2010_tooltips.json');

	//initial slider settings
	skipSlider = document.getElementById('slider');
	playButton = document.getElementById('vcr-play');
	pauseButton = document.getElementById('vcr-pause');
	refreshButton = document.getElementById('vcr-refresh');

	//create slider with noUiSlider library
	noUiSlider.create(skipSlider, {
	animate: true,
	animationDuration: 1000,
	range: {
		'min': 2000,
		'5%': 2001,
		'10%': 2002,
		'15%': 2003,
		'20%': 2004,
		'25%': 2005,
		'30%': 2006,
		'35%': 2007,
		'40%': 2008,
		'45%': 2009,
		'50%': 2010,
		'55%': 2011,
		'60%': 2012,
		'65%': 2013,
		'70%': 2014,
		'75%': 2015,
		//'80%': 2016,
		//'85%': 2017,
		//'90%': 2018,
		//'95%': 2019,
		'max': 2020
	},
	snap: true,
	start: [2000],
	format: wNumb({
		decimals: 0
	})
	});

	
//function for affordability maps: 20% down payment. This is the initial view (index.html)	
function loadAffordability20() {
	
	//make sure that animations are reset
	clearInterval();

	//clear the layer group
	activeLayers.clearLayers();
    
    //grab legend element from html and update the image to the affordability legend
    document.getElementById('legend').innerHTML = "<img id='affordLegend' src='images/legend_affordability.png' alt='affordability legend'></img>";
    
    //define the affordability layer and grab data from the geojson, then add this layer to the layer group
	var affordLayer = L.mapbox.featureLayer(SFaffordHex);
	affordLayer.addTo(activeLayers);
	
	//define tooltips
	function onEachFeature(layer) {
		//define short version of geojson field names
		var tooltip = layer.feature.properties;
		//short version of timestamp to work better with field names
		var year = timestamp.toString().substr(2,2);
		//affordability tooltip formatting
		var affdField20 = 'affd20_';
		var affd20Var = tooltip[affdField20 + year];
		var percentIncome_format = affd20Var*100;
		//median sales tooltip formatting
		var medSalesField = 'SP';
		var medSalesVar = tooltip[medSalesField + year];
		//interest tooltip formatting	
		var interestField = 'intrst_';
		var intrstVar = tooltip[interestField+year];
		var percentInt = intrstVar*100;
		//median family income tooltip formatting	
		var mfiField = 'hudmfi';
		var mfiVar = tooltip[mfiField + year];
		var mfi_format = parseInt(mfiVar);
		
		//define custom tooltips based on timestamp 				
		if (timestamp==2020){
		//define 2020 tooltip html and bind popup to data	
		var popupHTML = "Interest Rate: "+percentInt.toFixed(2)+"%<br>HUD Median Family Income: $"+mfi_format.toLocaleString();
		layer.bindPopup(popupHTML);

		} else if (timestamp <= 2015){
		//define all other year tooltips html and bind popup to data	
		var popupHTML = "Percent of Income Spent on Housing: "+percentIncome_format.toFixed(2)+"%<br>Median Sales Price: $"+medSalesVar.toLocaleString()+"<br>Interest Rate: "+percentInt.toFixed(2)+"%<br>HUD Median Family Income: $"+mfi_format.toLocaleString();
		layer.bindPopup(popupHTML);	

		}
	}//end onEachFeature function

	//define hex bin style
	function setStyle(){
		
		//call layer and define style for each hex
		affordLayer.eachLayer(function(layer){
			//call tooltip function
			onEachFeature(layer);
			//define short version of geojson field names
			var attr = layer.feature.properties;
			// default color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
			//hover opacity
			layer.on({
				mouseover: function(){
					layer.setStyle({"fillOpacity":"0.3"}); 			
				},
				mouseout: function(){
					layer.setStyle({"fillOpacity":"1"}); 					
				}
			});
			//variables for use in style classification below
			var slsField = 'numSls';
			var affdField = 'affd20_';
			//short version of timestamp used for applicable field names
			timestampShort = timestamp.toString().substr(2,2);
			
			//conditional statement for hex bin color classification
			if(attr[slsField + timestampShort] < 3){
				layer.setStyle({
					fillColor:"rgb(235, 235, 235)"
				});
			//must be high to low, otherwise all would be styled at the first 'else if' statement 
			}else if(attr[affdField + timestampShort] > 0.5 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(215,48,39)"
				}); 
			}else if(attr[affdField + timestampShort] > 0.4 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(252,141,89)"
				}); 
			}else if(attr[affdField + timestampShort] > 0.3 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(254,224,149)"
				}); 
			}else if(attr[affdField + timestampShort] > 0.25 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(217,239,149)"
				});	
			}else if(attr[affdField + timestampShort] >= 0.2 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(145,207,96)"
				});
			}else if(attr[affdField + timestampShort] < 0.2 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(26,152,80)"
				});
			
				  
			}else{

			}
			
			//different formatting for projected year, since there is no sales data
			if (timestamp == 2020 && attr[affdField + timestampShort] > 0.5 && attr.include_fo==1){
					layer.setStyle({
					fillColor:"rgba(215,48,39,1)"
				});
		
			}else if(timestamp == 2020 && attr[affdField + timestampShort] > 0.4&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(252,141,89,1)"
				}); 
			}else if(timestamp == 2020 && attr[affdField + timestampShort] > 0.3&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(254,224,149,1)"
				}); 
			}else if(timestamp == 2020 && attr[affdField + timestampShort] > 0.25&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(217,239,149,1)"
				});	
			}else if(timestamp == 2020 && attr[affdField + timestampShort] >= 0.2&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(145,207,96,1)"
				});
			}else if(timestamp == 2020 && attr[affdField + timestampShort] < 0.2&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(26,152,80,1)"
				});
			
			} else {
			}
		});
	}//end setStyle function
	

	//load buttons on map (reset css display setting)
	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");

	//update values for slider
	skipSlider.noUiSlider.updateOptions({
		animate: true,
		animationDuration: 1000,
		range: {
			'min': 2000,
			'5%': 2001,
			'10%': 2002,
			'15%': 2003,
			'20%': 2004,
			'25%': 2005,
			'30%': 2006,
			'35%': 2007,
			'40%': 2008,
			'45%': 2009,
			'50%': 2010,
			'55%': 2011,
			'60%': 2012,
			'65%': 2013,
			'70%': 2014,
			'75%': 2015,
			//'80%': 2016,
			//'85%': 2017,
			//'90%': 2018,
			//'95%': 2019,
			'max': 2020
		},
		snap: true,
		start: [2000],
		format: wNumb({
			decimals: 0
		})
	});

	//link slider values to year label html element
	skipValues = [
		document.getElementById('year-label'),
	];

	//define slider functionality
	skipSlider.noUiSlider.on('update', function( values, handle ) {
		//link timestamp to slider value
		timestamp=Number(values[handle]);
		skipValues[handle].innerHTML = values[handle];
		//define style when user moved slider
		setStyle();
		//change year label html for projected years
		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
		
	});

	//set functionality for play button
	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});

	//set functionality for pause button
	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});

	//set functionality for refresh button
	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(2000);
		updateTimestamp = 2000;

	});

	//define function for play animation
	function next() {

		if (timestamp < 2015){
			
 			updateTimestamp = timestamp + 1;
			setStyle();
			//updateTooltips();

			skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp >= 2015 && timestamp < 2020){
			timestamp += 2.5;
			console.log(timestamp);
	
		} else if (timestamp == 2020){
			updateTimestamp = timestamp + 1;
			setStyle();
			//updateTooltips();

			skipSlider.noUiSlider.set(updateTimestamp);
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
			
		} else if (updateTimestamp > 2020){
			clearInterval(play);
		}
	}//end next function
}//end loadAffordability20

function loadAffordability5() {
	
	//make sure that animations are reset
	clearInterval();

	//clear the layer group
	activeLayers.clearLayers();

    //grab legend element from html and update the image to the affordability legend
    document.getElementById('legend').innerHTML = "<img id='affordLegend' src='images/legend_affordability.png' alt='affordability legend'></img>";

    //define the affordability layer and grab data from the geojson, then add this layer to the layer group
	var affordLayer = L.mapbox.featureLayer(SFaffordHex);
	affordLayer.addTo(activeLayers);

	//define tooltips
	function onEachFeature(layer) {
		//define short version of geojson field names
		var tooltip = layer.feature.properties;
		//short version of timestamp to work better with field names
		var year = timestamp.toString().substr(2,2);
		//affordability tooltip formatting
		var affdField5 = 'affd5_';
		var affd5Var = tooltip[affdField5 + year];
		var percentIncome_format = affd5Var*100;
		//median sales tooltip formatting
		var medSalesField = 'SP';
		var medSalesVar = tooltip[medSalesField + year];
		//interest tooltip formatting		
		var interestField = 'intrst_';
		var intrstVar = tooltip[interestField+year];
		var percentInt = intrstVar*100;
		//median family income tooltip formatting	
		var mfiField = 'hudmfi';
		var mfiVar = tooltip[mfiField + year];
		var mfi_format = parseInt(mfiVar);
				
		//define custom tooltips based on timestamp
		if (timestamp==2020){
		//define 2020 tooltip html and bind popup to data
		var popupHTML = "Interest Rate: "+percentInt.toFixed(2)+"%<br>HUD Median Family Income: $"+mfi_format.toLocaleString();
		layer.bindPopup(popupHTML);

		} else if (timestamp <= 2015){
		//define all other year tooltips html and bind popup to data	
		var popupHTML = "Percent of Income Spent on Housing: "+percentIncome_format.toFixed(2)+"%<br>Median Sales Price: $"+medSalesVar.toLocaleString()+"<br>Interest Rate: "+percentInt.toFixed(2)+"%<br>HUD Median Family Income: $"+mfi_format.toLocaleString();

		layer.bindPopup(popupHTML);		
		}
	}//end onEachFeature function

	//define hex bin style
	function setStyle(){
		//call layer and define style for each hex
		affordLayer.eachLayer(function(layer){
			//call tooltip function
			onEachFeature(layer);
			//define short version of geojson field names
			var attr = layer.feature.properties;
			// default color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
			//hover opacity
			layer.on({
				mouseover: function(){
					layer.setStyle({"fillOpacity":"0.3"}); 			
				},
				mouseout: function(){
					layer.setStyle({"fillOpacity":"1"}); 					
				}
			});
			//variables for use in style classification below
			var slsField = 'numSls';
			var affdField = 'affd5_';
			//short version of timestamp used for applicable field names
			timestampShort = timestamp.toString().substr(2,2);
			
			//conditional statement for hex bin color classification
			if(attr[slsField + timestampShort] < 3){
				layer.setStyle({
					fillColor:"rgb(235, 235, 235)"
				});
			//must be high to low, otherwise all would be styled at the first 'else if' statement	
			}else if(attr[affdField + timestampShort] > 0.5 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(215,48,39)"
				}); 
			}else if(attr[affdField + timestampShort] > 0.4 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(252,141,89)"
				}); 
			}else if(attr[affdField + timestampShort] > 0.3 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(254,224,149)"
				}); 
			}else if(attr[affdField + timestampShort] > 0.25 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(217,239,149)"
				});	
			}else if(attr[affdField + timestampShort] >= 0.2 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(145,207,96)"
				});
			}else if(attr[affdField + timestampShort] < 0.2 && attr[slsField + timestampShort] >= 3){
				layer.setStyle({
					fillColor:"rgb(26,152,80)"
				});
			
				  
			}else{

			}
			//different formatting for projected year, since there is no sales data
			if (timestamp == 2020 && attr[affdField + timestampShort] > 0.5 && attr.include_fo==1){
					layer.setStyle({
					fillColor:"rgba(215,48,39,1)"
				});
		
			}else if(timestamp == 2020 && attr[affdField + timestampShort] > 0.4&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(252,141,89,1)"
				}); 
			}else if(timestamp == 2020 && attr[affdField + timestampShort] > 0.3&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(254,224,149,1)"
				}); 
			}else if(timestamp == 2020 && attr[affdField + timestampShort] > 0.25&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(217,239,149,1)"
				});	
			}else if(timestamp == 2020 && attr[affdField + timestampShort] >= 0.2&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(145,207,96,1)"
				});
			}else if(timestamp == 2020 && attr[affdField + timestampShort] < 0.2&& attr.include_fo==1){
				layer.setStyle({
					fillColor:"rgba(26,152,80,1)"
				});
			
			} else {
			}
		});
	}//end setStyle function
	
	//load buttons on map (reset css display setting)
	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");

	//update values for slider
	skipSlider.noUiSlider.updateOptions({
		animate: true,
		animationDuration: 1000,
		range: {
			'min': 2000,
			'5%': 2001,
			'10%': 2002,
			'15%': 2003,
			'20%': 2004,
			'25%': 2005,
			'30%': 2006,
			'35%': 2007,
			'40%': 2008,
			'45%': 2009,
			'50%': 2010,
			'55%': 2011,
			'60%': 2012,
			'65%': 2013,
			'70%': 2014,
			'75%': 2015,
			//'80%': 2016,
			//'85%': 2017,
			//'90%': 2018,
			//'95%': 2019,
			'max': 2020
		},
		snap: true,
		start: [2000],
		format: wNumb({
			decimals: 0
		})
	});

	//link slider values to year label html element
	skipValues = [
		document.getElementById('year-label'),
	];

	//define slider functionality
	skipSlider.noUiSlider.on('update', function( values, handle ) {
		//link timestamp to slider value
		timestamp=Number(values[handle]);
		skipValues[handle].innerHTML = values[handle];
		//define style when user moved slider
		setStyle();
		//change year label html for projected years
		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
		
	});

	//set functionality for play button
	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});

	//set functionality for pause button
	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});

	//set functionality for refresh button
	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(2000);
		updateTimestamp = 2000;

	});

	//define function for play animation
	function next() {

		if (timestamp < 2015){
			
 			updateTimestamp = timestamp + 1;
			setStyle();
			//updateTooltips();

			skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp >= 2015 && timestamp < 2020){
			timestamp += 2.5;
	
		} else if (timestamp == 2020){
			updateTimestamp = timestamp + 1;
			setStyle();
			//updateTooltips();

			skipSlider.noUiSlider.set(updateTimestamp);
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
			
		} else if (updateTimestamp > 2020){
			clearInterval(play);
		}
	}//end next function
}// end loadAffordability5	

//function for vulnerability map
function loadVulnerability(){
	//make sure that animations are reset
	clearInterval();

	//clear the layer group
	activeLayers.clearLayers();

	//grab legend element from html and update the image to the vulnerability legend
    document.getElementById('legend').innerHTML = "<img id='vIndexLegend' src='images/legend_vIndex.png' alt='affordability legend'></img>";

    //define the vulnerability layer and grab data from the geojson, then add this layer to the layer group
	var vulnerability = L.mapbox.featureLayer(censusHex);
	vulnerability.addTo(activeLayers);
	
	//add census tract layer to layer group
	cTract.addTo(activeLayers);
	//initialize census tract layer for tooltip functionality
	cTract.on('ready',function(layer){
		this.eachLayer(function(feature){
            //define style (initially not visible)
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			//define path to geojson field names
			var tooltip = feature.toGeoJSON().properties;
			//create variable for short version of year
			var year = timestamp.toString().substr(2,2);
			//call vulnerability field and create variable
			var vIndexField = 'SC_TOT';
			var vIndexVar = tooltip[vIndexField + year];
			//call non white field and create variable and format for tooltip
			var nwhiteField = 'NONWHT_';
			var nwhiteVar = tooltip[nwhiteField + timestamp];
			var nwhite_format = nwhiteVar*100;
			//call without bachelor's degree field and create variable and format for tooltip
			var bachField = 'LSBCH_';
			var bachVar = tooltip[bachField + timestamp];
			var bach_format = bachVar*100;
			//call renters field and create variable and format for tooltip
			var rentersField = 'RENT_';
			var rentVar = tooltip[rentersField + timestamp];
			var rent_format = rentVar*100;
			//call HUD MFI field and create variable and format for tooltip
			var hudField = 'LSHUD_';
			var hudVar = tooltip[hudField + timestamp];
			var hud_format = hudVar*100;
			//create variable for html to show in tooltip, bind popup on click									
			var popupHTML = "Displacement Vulnerability Score: "+vIndexVar+"<br>Non-White: "+nwhite_format.toFixed(2)+"%<br>Without Bachelor's Degree: "+bach_format.toFixed(2)+"%<br>Renters: "+rent_format.toFixed(2)+"% <br>Below 80% HUD Median Family Income: "+hud_format.toFixed(2)+"%";
			feature.bindPopup(popupHTML);
			//style for hover functionality 
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.5", "opacity":"0.5"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
     });

	//function that updates the data reflected in the tooltips
	function updateTooltips(){
		//test for projected years, define different tooltip data
		if (timestamp==2020){
			cTract.eachLayer(function(feature){
            //define style of initial view
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
            //define path to geojson field names 
            var tooltip = feature.toGeoJSON().properties;
            //create variable for short version of year
			var year = timestamp.toString().substr(2,2);
			//call vulnerability field and create variable
			var vIndexField = 'SC_TOT';
			var vIndexVar = tooltip[vIndexField + year];
            //feature.closePopup();  	
			//feature.unbindPopup();
			//create variable for html to show in tooltip, bind popup on click
			var popupHTML = "Displacement Vulnerability Score: "+vIndexVar;
			feature.bindPopup(popupHTML);
			//style for hover functionality
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.5", "opacity":"0.5"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
		//tooltip style for non-projected years
		}else{	
		cTract.eachLayer(function(feature){
            //define style of initial view
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			//define path to geojson field names
			var tooltip = feature.toGeoJSON().properties;
			//create variable for short version of year
			var year = timestamp.toString().substr(2,2);
			//call vulnerability field and create variable	
			var vIndexField = 'SC_TOT';
			var vIndexVar = tooltip[vIndexField + year];
			//call non white field and create variable and format for tooltip
			var nwhiteField = 'NONWHT_';
			var nwhiteVar = tooltip[nwhiteField + timestamp];
			var nwhite_format = nwhiteVar*100;
			//call without bachelor's degree field and create variable and format for tooltip
			var bachField = 'LSBCH_';
			var bachVar = tooltip[bachField + timestamp];
			var bach_format = bachVar*100;
			//call renters field and create variable and format for tooltip
			var rentersField = 'RENT_';
			var rentVar = tooltip[rentersField + timestamp];
			var rent_format = rentVar*100;
			//call HUD MFI field and create variable and format for tooltip
			var hudField = 'LSHUD_';
			var hudVar = tooltip[hudField + timestamp];
			var hud_format = hudVar*100;
			//create variable for html to show in tooltip, bind popup on click							
			var popupHTML = "Displacement Vulnerability Score: "+vIndexVar+"<br>Non-White: "+nwhite_format.toFixed(2)+"%<br>Without Bachelor's Degree: "+bach_format.toFixed(2)+"%<br>Renters: "+rent_format.toFixed(2)+"% <br>Below 80% HUD Median Family Income: "+rent_format.toFixed(2)+"%";
			feature.bindPopup(popupHTML);
			//style for hover functionality
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.5", "opacity":"0.5"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
		}
   		
	}
	//define hex bin style
	function setStyle(){
		//call layer and define style for each hex
		vulnerability.eachLayer(function(layer){
			//define short version of geojson field names
			var attr = layer.feature.properties;
			//default color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
			//define vulnerability field in order to define classes for styling
			var vulnField= 'SC_TOT_';
			//conditional statement for hex bin color classification
			if(attr[vulnField + timestamp] === 0){
				layer.setStyle({
					fillColor:"rgb(235,235,235)"
				});
			}else if(attr[vulnField + timestamp]=== 1){
				layer.setStyle({
					fillColor:"rgb(254,229,217)"
				});
			
			}else if(attr[vulnField + timestamp] === 2){
				layer.setStyle({
					fillColor:"rgb(252,174,145)"
				});
			
			}else if(attr[vulnField + timestamp] === 3){
				layer.setStyle({
					fillColor:"rgb(251,106,74)"
				});
			
			}else if(attr[vulnField + timestamp] === 4){
				layer.setStyle({
					fillColor:"rgb(203,24,29)"
				}); 
		  
			}else{

			}

		});
	}//end setStyle function

	//load buttons on map (reset css display setting)
	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");

	//update values for slider
	skipSlider.noUiSlider.updateOptions({
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
			//'80%': 2015,
			//'84%': 2016,
			//'88%': 2017,
			//'92%': 2018,
			//'96%': 2019,
			'max': 2020
		},
		snap: true,
		start: [1990],
		format: wNumb({
			decimals: 0
		})
	});

	//link slider values to year label html element
	skipValues = [
		document.getElementById('year-label'),
	];
	//define slider functionality
	skipSlider.noUiSlider.on('update', function( values, handle ) {
		//link timestamp to slider value
		timestamp=Number(values[handle]);
		skipValues[handle].innerHTML = values[handle];
		//define style and tooltip data when user moved slider
		setStyle();
		updateTooltips();
		//change year label html for projected years
		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
	});
	//set functionality for play button
	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});
	//set functionality for pause button
	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});
	//set functionality for refresh button
	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(1990);
		updateTimestamp = 1990;
	});
	//define function for play animation
	function next() {

		if (timestamp == 1990) {
	
			updateTimestamp = timestamp + 10;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);


		} else if (timestamp == 2000){
			updateTimestamp = timestamp + 9;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp < 2014){
			updateTimestamp = timestamp + 1;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
		
		} else if (timestamp >= 2014 && timestamp < 2020){
			timestamp += 3;
			
			
		} else if (timestamp == 2020){
			updateTimestamp = timestamp + 1;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		
		} else if (updateTimestamp > 2020){
		clearInterval(play);
		}
	}//end next function

}//end vulnerability function

function loadOwnership() {
	//make sure that animations are reset
	clearInterval();
	//clear the layer group
    activeLayers.clearLayers();
    //grab legend element from html and update the image to the ownership legend
    document.getElementById('legend').innerHTML = "<img id='ownLegend' src='images/legend_ownership.png' alt='affordability legend'></img>";
    //define the ownership layer and grab data from the geojson, then add this layer to the layer group
	var ownershipLayer = L.mapbox.featureLayer(censusHex);
	ownershipLayer.addTo(activeLayers);
	//add census tract layer to layer group
	cTract.addTo(activeLayers);
	//initialize census tract layer for tooltip functionality
	cTract.on('ready',function(layer){
		this.eachLayer(function(feature){
            //define style
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			//define path to geojson field names
			var tooltip = feature.toGeoJSON().properties;
			//create variable for short version of year
			var year = timestamp.toString().substr(2,2);
			//call ownership field and create variable and format for tooltip
			var ownField = 'OWN_';
			var ownVar = tooltip[ownField + timestamp];
			var ownVar_format = ownVar*100;
			//create variable for html to show in tooltip, bind popup on click
			var popupHTML = "Owner-occupied homes: "+ownVar_format.toFixed(2)+"%";
			feature.bindPopup(popupHTML);
			//style for hover functionality
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.5", "opacity":"0.5"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
     });
	//function that updates the data reflected in the tooltips
	function updateTooltips(){
		//test for projected years, define different tooltip data
		if (timestamp==2020){
			cTract.eachLayer(function(feature){
            //define style of initial view
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			//define function that forces the popup to close and is not activated for projected years
			feature.closePopup();
			feature.unbindPopup();
			//style for hover functionality
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
			
      		});
      	//tooltip style for non-projected years	
		}else{
			
			cTract.eachLayer(function(feature){
	            //define style of initial view
	            feature.setStyle({
	            	fillColor:'white',
	                fillOpacity:'0',
	                color: 'white',
	                weight: '0.5',
	                opacity: '0'
	            });
				
				//define path to geojson field names
				var tooltip = feature.toGeoJSON().properties;
				//create variable for short version of year
				var year = timestamp.toString().substr(2,2);
				//call ownership field and create variable and format for tooltip
				var ownField = 'OWN_';
				var ownVar = tooltip[ownField + timestamp];
				var ownVar_format = ownVar*100;
				//create variable for html to show in tooltip, bind popup on click
				var popupHTML = "Owner-Occupied Homes: "+ownVar_format.toFixed(2)+"%";
				feature.bindPopup(popupHTML);
				//style for hover functionality
				feature.on({
					mouseover: function(){
						feature.setStyle({"fillOpacity":"0.5", "opacity":"0.5"}); 			
					},
					mouseout: function(){
						feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
					}
				});
	      	});
		}
	}
	//define hex bin style
	function setStyle(){
		//call layer and define style for each hex
		ownershipLayer.eachLayer(function(layer){
			//define short version of geojson field names		
			var attr = layer.feature.properties;
			//default color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
			//define vulnerability field in order to define classes for styling
			var ownField= 'OWN_';
			//conditional statement for hex bin color classification					
			if(attr[ownField + timestamp] <= 0.5){
				layer.setStyle({
					fillColor:"rgb(239,243,255)"
				});
			}else if(attr[ownField + timestamp] > 0.9){
				layer.setStyle({
					fillColor:"rgb(8,81,156)"
				});
			
			}else if(attr[ownField + timestamp] > 0.8){
				layer.setStyle({
					fillColor:"rgb(49,130,189)"
				});
			
			}else if(attr[ownField + timestamp] > 0.7){
				layer.setStyle({
					fillColor:"rgb(107,174,214)"
				});
			
			}else if(attr[ownField + timestamp] > 0.6){
				layer.setStyle({
					fillColor:"rgb(158,202,225)"
				}); 
				
			}else if(attr[ownField + timestamp] > 0.5){
				layer.setStyle({
					fillColor:"rgb(239,243,255)"
				}); 
				  
			}else{

			}
			
		});
	}//end setStyle function

	//load buttons on map (reset css display setting)
	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");

	//update values for slider
	skipSlider.noUiSlider.updateOptions({
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
			//'80%': 2015,
			//'84%': 2016,
			//'88%': 2017,
			//'92%': 2018,
			//'96%': 2019,
			'max': 2020
		},
		snap: true,
		start: [1990],
		format: wNumb({
			decimals: 0
		})
	});
	//link slider values to year label html element
	skipValues = [
		document.getElementById('year-label'),
	];
	//define slider functionality
	skipSlider.noUiSlider.on('update', function( values, handle ) {
		//link timestamp to slider value
		timestamp=Number(values[handle]);
		skipValues[handle].innerHTML = values[handle];
		//define style and tooltip data when user moves slider
		setStyle();
		updateTooltips();
		//change year label html for projected years
		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
	});
	//set functionality for play button
	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});
	//set functionality for pause button
	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});
	//set functionality for refresh button
	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(1990);
		updateTimestamp = 1990;


	});
	//setStyle();
	//updateTooltips();
	//define function for play animation
	function next() {

		if (timestamp == 1990) {
	
			updateTimestamp = timestamp + 10;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);


		} else if (timestamp == 2000){
			updateTimestamp = timestamp + 9;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp < 2014){
			updateTimestamp = timestamp + 1;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
		
		} else if (timestamp >= 2014 && timestamp < 2020){
			timestamp += 3;
			
			
		} else if (timestamp == 2020){
			updateTimestamp = timestamp + 1;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		
		} else if (updateTimestamp > 2020){
		clearInterval(play);
		}
	}//end next function
	
}//end ownership function

function loadNonWhite() {
	//make sure that animations are reset
	clearInterval();
	//clear the layer group
    activeLayers.clearLayers();
    //grab legend element from html and update the image to the legend
    document.getElementById('legend').innerHTML = "<img id='nonwhiteLegend' src='images/legend_nonwhite.png' alt='non white population legend'></img>";
    //define the ownership layer and grab data from the geojson, then add this layer to the layer group
	var nonwhiteLayer = L.mapbox.featureLayer(censusHex);
	nonwhiteLayer.addTo(activeLayers);
	//add census tract layer to layer group
	cTract.addTo(activeLayers);
	//initialize census tract layer for tooltip functionality
	cTract.on('ready',function(layer){
		this.eachLayer(function(feature){
            //define style
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			//define path to geojson field names
			var tooltip = feature.toGeoJSON().properties;
			//create variable for short version of year
			var year = timestamp.toString().substr(2,2);
			//call ownership field and create variable and format for tooltip
			//var ownField = 'OWN_';
			//var ownVar = tooltip[ownField + timestamp];
			//var ownVar_format = ownVar*100;
			//create variable for html to show in tooltip, bind popup on click
			var popupHTML = "";
			feature.bindPopup(popupHTML);
			//style for hover functionality
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.5", "opacity":"0.5"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
     });
	//function that updates the data reflected in the tooltips
	function updateTooltips(){
		//test for projected years, define different tooltip data
		if (timestamp==2020){
			cTract.eachLayer(function(feature){
            //define style of initial view
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			//define function that forces the popup to close and is not activated for projected years
			feature.closePopup();
			feature.unbindPopup();
			//style for hover functionality
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
			
      		});
      	//tooltip style for non-projected years	
		}else{
			
			cTract.eachLayer(function(feature){
	            //define style of initial view
	            feature.setStyle({
	            	fillColor:'white',
	                fillOpacity:'0',
	                color: 'white',
	                weight: '0.5',
	                opacity: '0'
	            });
				
				//define path to geojson field names
				//var tooltip = feature.toGeoJSON().properties;
				//create variable for short version of year
				//var year = timestamp.toString().substr(2,2);
				//call ownership field and create variable and format for tooltip
				//var ownField = 'OWN_';
				//var ownVar = tooltip[ownField + timestamp];
				//var ownVar_format = ownVar*100;
				//create variable for html to show in tooltip, bind popup on click
				var popupHTML = "";
				feature.bindPopup(popupHTML);
				//style for hover functionality
				feature.on({
					mouseover: function(){
						feature.setStyle({"fillOpacity":"0.5", "opacity":"0.5"}); 			
					},
					mouseout: function(){
						feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
					}
				});
	      	});
		}
	}
	//define hex bin style
	function setStyle(){
		//call layer and define style for each hex
		nonwhiteLayer.eachLayer(function(layer){
			//define short version of geojson field names		
			var attr = layer.feature.properties;
			//default color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
			//define vulnerability field in order to define classes for styling
			var nonWhiteField= 'NONWHT_';
			//conditional statement for hex bin color classification					
			if(attr[nonWhiteField + timestamp] > 0.5){
				layer.setStyle({
					fillColor:"rgb(8,88,158)"
				}); 
			}else if(attr[nonWhiteField + timestamp] > 0.4){
				layer.setStyle({
					fillColor:"rgb(43,140,190)"
				}); 
			}else if(attr[nonWhiteField + timestamp] > 0.3){
				layer.setStyle({
					fillColor:"rgb(78,179,211)"
				});
			}else if(attr[nonWhiteField + timestamp] > 0.2){
				layer.setStyle({
					fillColor:"rgb(123,204,196)"
				});
			}else if(attr[nonWhiteField + timestamp] > 0.1){
				layer.setStyle({
					fillColor:"rgb(168,221,181)"
				});	
			}else if(attr[nonWhiteField + timestamp] >= 0.05){
				layer.setStyle({
					fillColor:"rgb(204,235,197)"
				});
			}else if(attr[nonWhiteField + timestamp] < 0.05){
				layer.setStyle({
					fillColor:"rgb(240,249,232)"
				});
						  
			}else{

			}
			
		});
	}//end setStyle function

	//load buttons on map (reset css display setting)
	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");

	//update values for slider
	skipSlider.noUiSlider.updateOptions({
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
			//'80%': 2015,
			//'84%': 2016,
			//'88%': 2017,
			//'92%': 2018,
			//'96%': 2019,
			'max': 2020
		},
		snap: true,
		start: [1990],
		format: wNumb({
			decimals: 0
		})
	});
	//link slider values to year label html element
	skipValues = [
		document.getElementById('year-label'),
	];
	//define slider functionality
	skipSlider.noUiSlider.on('update', function( values, handle ) {
		//link timestamp to slider value
		timestamp=Number(values[handle]);
		skipValues[handle].innerHTML = values[handle];
		//define style and tooltip data when user moves slider
		setStyle();
		updateTooltips();
		//change year label html for projected years
		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
	});
	//set functionality for play button
	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});
	//set functionality for pause button
	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});
	//set functionality for refresh button
	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(1990);
		updateTimestamp = 1990;


	});
	//setStyle();
	//updateTooltips();
	//define function for play animation
	function next() {

		if (timestamp == 1990) {
	
			updateTimestamp = timestamp + 10;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);


		} else if (timestamp == 2000){
			updateTimestamp = timestamp + 9;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp < 2014){
			updateTimestamp = timestamp + 1;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
		
		} else if (timestamp >= 2014 && timestamp < 2020){
			timestamp += 3;
			
			
		} else if (timestamp == 2020){
			updateTimestamp = timestamp + 1;
	
			setStyle();
			updateTooltips();
			skipSlider.noUiSlider.set(updateTimestamp);
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		
		} else if (updateTimestamp > 2020){
		clearInterval(play);
		}
	}//end next function
	
}//end nonwhite function

