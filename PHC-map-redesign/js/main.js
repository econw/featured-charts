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
	var southWest = L.latLng(45.043598, -123.440661),
    	northEast = L.latLng(46.023814, -122.013812),
    	bounds = L.latLngBounds(southWest, northEast);
    
	map = L.mapbox.map('map', '',{
		maxBounds: bounds,
		maxZoom: 13,
		minZoom: 9

	}).setView([45.467021, -122.675738], 10);


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
	//map.addControl(new uiControl('#affdButton', { position: 'topleft' }));
	map.addControl(new uiControl('#homeButton', { position: 'topleft' }));
	map.addControl(new uiControl('#map-menu', { position: 'topleft' }));

	$("#homeButton").click(function() {
		map.setView([45.467021, -122.675738], 10);
	});

	var topBasemap = map._createPane('leaflet-top-pane', map.getPanes().mapPane);
    var labels = L.mapbox.tileLayer('econw.0iw1bc23').addTo(map);
    topBasemap.appendChild(labels.getContainer());
    labels.setZIndex(7);
    
	activeLayers = L.layerGroup().addTo(map);

	var cTract = omnivore.topojson('http://econw.github.io/PHC-map/PHC-map-redesign/data/ctract2010_tooltips.json');

	skipSlider = document.getElementById('slider');
	playButton = document.getElementById('vcr-play');
	pauseButton = document.getElementById('vcr-pause');
	refreshButton = document.getElementById('vcr-refresh');

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

	
	
function loadAffordability20() {
	
	clearInterval();
	activeLayers.clearLayers();
    
    document.getElementById('legend').innerHTML = "<img id='affordLegend' src='images/legend_affordability.png' alt='affordability legend'></img>";
    
	var affordLayer = L.mapbox.featureLayer(SFaffordHex);

	affordLayer.addTo(activeLayers);
	
	cTract.addTo(activeLayers);
	cTract.on('ready',function(layer){
		this.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'gray',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			var tooltip = feature.toGeoJSON().properties;
			var year = timestamp.toString().substr(2,2);

			var affdField20 = 'affd20_';
			var affd20Var = tooltip[affdField20 + year];
			var percentIncome_format = affd20Var*100;

			var medSalesField = 'SP';
			var medSalesVar = tooltip[medSalesField + year];
			var medSales_format = medSalesVar.toLocaleString();
			
			var interestField = 'intrst_';
			var intrstVar = tooltip[interestField+year];
			var percentInt = intrstVar*100;
			
			var mfiField = 'hudmfi';
			var mfiVar = tooltip[mfiField + year];
				
			var popupHTML = "Percent of Income spent on Housing: "+percentIncome_format.toFixed(2)+"%<br>Median Sales Price: $"+medSales_format+"<br>Interest Rate: "+percentInt.toFixed(2)+"%<br>HUD Median Family Income: $"+mfiVar.toLocaleString();

			feature.bindPopup(popupHTML);

			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.3", "opacity":"0.3"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
     });

	function updateTooltips(){
		if (timestamp==2020){
			cTract.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'gray',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
            feature.closePopup();  	
			feature.unbindPopup();
			
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
			
      	});
		}else{
			
		cTract.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'gray',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			
			var tooltip = feature.toGeoJSON().properties;
			var year = timestamp.toString().substr(2,2);

			var affdField20 = 'affd20_';
			var affd20Var = tooltip[affdField20 + year];
			var percentIncome_format = affd20Var*100;

			var medSalesField = 'SP';
			var medSalesVar = tooltip[medSalesField + year];
			
			var interestField = 'intrst_';
			var intrstVar = tooltip[interestField+year];
			var percentInt = intrstVar*100;
			
			var mfiField = 'hudmfi';
			var mfiVar = tooltip[mfiField + year];
				
			var popupHTML = "Percent of Income spent on Housing: "+percentIncome_format.toFixed(2)+"%<br>Median Sales Price: $"+medSalesVar.toLocaleString()+"<br>Interest Rate: "+percentInt.toFixed(2)+"%<br>HUD Median Family Income: $"+mfiVar.toLocaleString();

			feature.bindPopup(popupHTML);

			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.3", "opacity":"0.3"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
		}
   		
	}
		
	function setStyle(){
		
		
		
		affordLayer.eachLayer(function(layer){
			
			var attr = layer.feature.properties;
			// color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
		
		
			var slsField = 'numSls';
			var affdField = 'affd20_';
		
			timestampShort = timestamp.toString().substr(2,2);
			

			if(attr[slsField + timestampShort] < 3){
				layer.setStyle({
					fillColor:"rgb(235, 235, 235)"
				});
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
	}
	
	function clearStyle(){
	
		affordLayer.eachLayer(function(layer){
		
			layer.setStyle({
				weight: 0,
				color: 'rgba(255,255,255,0)',
				fillOpacity: 0
			});
		
		});
	}

	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");

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


	skipValues = [
		document.getElementById('year-label'),
	];


	skipSlider.noUiSlider.on('update', function( values, handle ) {
	
		timestamp=Number(values[handle]);

	
		skipValues[handle].innerHTML = values[handle];
		
		setStyle();
		updateTooltips();

		if (timestamp > 2015 && timestamp < 2020){
			clearStyle()
		} else {
		}
		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
		
	});


	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});

	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});

	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(2000);
		updateTimestamp = 2000;

	});


	//setStyle();
	
	
	function next() {

		if (timestamp < 2015){
			
 			updateTimestamp = timestamp + 1;
			setStyle();
			updateTooltips();

			skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp >= 2015 && timestamp < 2020){
			timestamp += 2.5;
			console.log(timestamp);
	
		} else if (timestamp == 2020){
			updateTimestamp = timestamp + 1;
			setStyle();
			updateTooltips();

			skipSlider.noUiSlider.set(updateTimestamp);
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
			
		} else if (updateTimestamp > 2020){
			clearInterval(play);
		}
	}
}

function loadAffordability5() {
	
	clearInterval();
	activeLayers.clearLayers();
    
    document.getElementById('legend').innerHTML = "<img id='affordLegend' src='images/legend_affordability.png' alt='affordability legend'></img>";
    
	var affordLayer = L.mapbox.featureLayer(SFaffordHex);

	affordLayer.addTo(activeLayers);
	
	cTract.addTo(activeLayers);
	cTract.on('ready',function(layer){
		this.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'gray',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			var tooltip = feature.toGeoJSON().properties;
			var year = timestamp.toString().substr(2,2);

			var affdField5 = 'affd5_';
			var affd5Var = tooltip[affdField5 + year];
			var percentIncome_format = affd5Var*100;

			var medSalesField = 'SP';
			var medSalesVar = tooltip[medSalesField + year];
			
			var interestField = 'intrst_';
			var intrstVar = tooltip[interestField+year];
			var percentInt = intrstVar*100;
			
			var mfiField = 'hudmfi';
			var mfiVar = tooltip[mfiField + year];
				
			var popupHTML = "Percent of Income spent on Housing: "+percentIncome_format.toFixed(2)+"%<br>Median Sales Price: $"+medSalesVar.toLocaleString()+"<br>Interest Rate: "+percentInt.toFixed(2)+"%<br>HUD Median Family Income: $"+mfiVar.toLocaleString();

			feature.bindPopup(popupHTML);

			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.3", "opacity":"0.3"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
     });

	function updateTooltips(){
		if (timestamp==2020){
			cTract.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'gray',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
            feature.closePopup();  	
			feature.unbindPopup();
			
			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
			
      	});
		}else{
			
		cTract.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'gray',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			
			var tooltip = feature.toGeoJSON().properties;
			var year = timestamp.toString().substr(2,2);

			var affdField5 = 'affd5_';
			var affd5Var = tooltip[affdField5 + year];
			var percentIncome_format = affd5Var*100;

			var medSalesField = 'SP';
			var medSalesVar = tooltip[medSalesField + year];
			
			var interestField = 'intrst_';
			var intrstVar = tooltip[interestField+year];
			var percentInt = intrstVar*100;
			
			var mfiField = 'hudmfi';
			var mfiVar = tooltip[mfiField + year];
				
			var popupHTML = "Percent of Income spent on Housing: "+percentIncome_format.toFixed(2)+"%<br>Median Sales Price: $"+medSalesVar.toLocaleString()+"<br>Interest Rate: "+percentInt.toFixed(2)+"%<br>HUD Median Family Income: $"+mfiVar.toLocaleString();

			feature.bindPopup(popupHTML);

			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.3", "opacity":"0.3"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
		}
   		
	}
		
	function setStyle(){
		
		
		
		affordLayer.eachLayer(function(layer){
			//layer.on({
			//	mouseover: function(){
			//		layer.openPopup();				
			//	},
			//	mouseout: function(){
			//		layer.closePopup();				
			//	}
			//});
			//onEachFeature(layer);
			var attr = layer.feature.properties;
			// color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
		
		
			var slsField = 'numSls';
			var affdField = 'affd5_';
		
			timestampShort = timestamp.toString().substr(2,2);
			

			if(attr[slsField + timestampShort] < 3){
				layer.setStyle({
					fillColor:"rgb(235, 235, 235)"
				});
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
	}
	
	function clearStyle(){
	
		affordLayer.eachLayer(function(layer){
		
			layer.setStyle({
				weight: 0,
				color: 'rgba(255,255,255,0)',
				fillOpacity: 0
			});
		
		});
	}



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


	skipValues = [
		document.getElementById('year-label'),
	];

	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");

	skipSlider.noUiSlider.on('update', function( values, handle ) {
	
		timestamp=Number(values[handle]);

	
		skipValues[handle].innerHTML = values[handle];
		
		setStyle();
		updateTooltips();

		if (timestamp > 2015 && timestamp < 2020){
			clearStyle()
		} else {
		}
		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
		
	});


	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});

	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});

	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(2000);
		updateTimestamp = 2000;

	});


	//setStyle();
	
	
	function next() {

		if (timestamp < 2015){
			
 			updateTimestamp = timestamp + 1;
			setStyle();
			updateTooltips();

			skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp >= 2015 && timestamp < 2020){
			timestamp += 2.5;
			console.log(timestamp);
	
		} else if (timestamp == 2020){
			updateTimestamp = timestamp + 1;
			setStyle();
			updateTooltips();

			skipSlider.noUiSlider.set(updateTimestamp);
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
			
		} else if (updateTimestamp > 2020){
			clearInterval(play);
		}
	}
}	


function loadVulnerability(){
	clearInterval();

	activeLayers.clearLayers();

    document.getElementById('legend').innerHTML = "<img id='vIndexLegend' src='images/legend_vIndex.png' alt='affordability legend'></img>";

	var vulnerability = L.mapbox.featureLayer(censusHex);
	vulnerability.addTo(activeLayers);
	
	cTract.addTo(activeLayers);
	cTract.on('ready',function(layer){
		this.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			
			var tooltip = feature.toGeoJSON().properties;
			var year = timestamp.toString().substr(2,2);

			var vIndexField = 'SC_TOT';
			var vIndexVar = tooltip[vIndexField + year];

			var nwhiteField = 'NONWHT_';
			var nwhiteVar = tooltip[nwhiteField + timestamp];
			var nwhite_format = nwhiteVar*100;

			var bachField = 'LSBCH_';
			var bachVar = tooltip[bachField + timestamp];
			var bach_format = bachVar*100;

			var rentersField = 'RENT_';
			var rentVar = tooltip[rentersField + timestamp];
			var rent_format = rentVar*100;

			var hudField = 'LSHUD_';
			var hudVar = tooltip[hudField + timestamp];
			var hud_format = hudVar*100;
										
			var popupHTML = "Displacement Vulnerability Score: "+vIndexVar+"<br>Non-White: "+nwhite_format.toFixed(2)+"%<br>Without Bachelor's Degree: "+bach_format.toFixed(2)+"%<br>Renters: "+rent_format.toFixed(2)+"% <br>Below 80% HUD Median Family Income: "+rent_format.toFixed(2)+"%";

			feature.bindPopup(popupHTML);

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

	function updateTooltips(){
		if (timestamp==2020){
			cTract.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
            feature.closePopup();  	
			feature.unbindPopup();

			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
		}else{
			
		cTract.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'white',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			
			var tooltip = feature.toGeoJSON().properties;
			var year = timestamp.toString().substr(2,2);

			var vIndexField = 'SC_TOT';
			var vIndexVar = tooltip[vIndexField + year];

			var nwhiteField = 'NONWHT_';
			var nwhiteVar = tooltip[nwhiteField + timestamp];
			var nwhite_format = nwhiteVar*100;

			var bachField = 'LSBCH_';
			var bachVar = tooltip[bachField + timestamp];
			var bach_format = bachVar*100;

			var rentersField = 'RENT_';
			var rentVar = tooltip[rentersField + timestamp];
			var rent_format = rentVar*100;

			var hudField = 'LSHUD_';
			var hudVar = tooltip[hudField + timestamp];
			var hud_format = hudVar*100;
										
			var popupHTML = "Displacement Vulnerability Score: "+vIndexVar+"<br>Non-White: "+nwhite_format.toFixed(2)+"%<br>Without Bachelor's Degree: "+bach_format.toFixed(2)+"%<br>Renters: "+rent_format.toFixed(2)+"% <br>Below 80% HUD Median Family Income: "+rent_format.toFixed(2)+"%";

			feature.bindPopup(popupHTML);

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

	function setStyle(){
		
	
		vulnerability.eachLayer(function(layer){
			//layer.on({
			//	mouseover: function(){
			//		layer.openPopup();				
			//	},
			//	mouseout: function(){
			//		layer.closePopup();				
			//	}
			//});
			
			//onEachFeature(layer);
			var attr = layer.feature.properties;
			// color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
		
			var vulnField= 'SC_TOT_';
			
			/*layer.on({
				mouseover: function(){
					layer.setStyle({"fillOpacity":"0.1"}); 			
				},
				mouseout: function(){
					layer.setStyle({"fillOpacity":"1"}); 					
				}
			});*/
			
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
	}

	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");

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

	skipValues = [
		document.getElementById('year-label'),
	];



	skipSlider.noUiSlider.on('update', function( values, handle ) {
	
		timestamp=Number(values[handle]);
	
		skipValues[handle].innerHTML = values[handle];
		
		setStyle();
		updateTooltips();
		
		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
	});


	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});

	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});

	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(1990);
		updateTimestamp = 1990;


	});



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
	}


}

function loadOwnership() {
	clearInterval();
    activeLayers.clearLayers();
    document.getElementById('legend').innerHTML = "<img id='ownLegend' src='images/legend_ownership.png' alt='affordability legend'></img>";

	var ownershipLayer = L.mapbox.featureLayer(censusHex);
	ownershipLayer.addTo(activeLayers);

	var cTract = omnivore.topojson('../data/ctract2010_tooltips.json');
	cTract.addTo(activeLayers);

	cTract.on('ready',function(layer){
		this.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'gray',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			
			var tooltip = feature.toGeoJSON().properties;
			var year = timestamp.toString().substr(2,2);

			var ownField = 'OWN_';
			var ownVar = tooltip[ownField + timestamp];
			var ownVar_format = ownVar*100;

			var popupHTML = "Owner-occupied homes: "+ownVar_format.toFixed(2)+"%";

			feature.bindPopup(popupHTML);

			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0.3", "opacity":"0.3"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
      	});
     });

	function updateTooltips(){
		if (timestamp==2020){
			cTract.eachLayer(function(feature){
            
              feature.setStyle({
              	fillColor:'gray',
                fillOpacity:'0',
                color: 'white',
                weight: '0.5',
                opacity: '0'
            });
			
			feature.closePopup();
			feature.unbindPopup();

			feature.on({
				mouseover: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 			
				},
				mouseout: function(){
					feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
				}
			});
			
      		});
		}else{
			
			cTract.eachLayer(function(feature){
	            
	              feature.setStyle({
	              	fillColor:'gray',
	                fillOpacity:'0',
	                color: 'white',
	                weight: '0.5',
	                opacity: '0'
	            });
				
				
				var tooltip = feature.toGeoJSON().properties;
				var year = timestamp.toString().substr(2,2);

				var ownField = 'OWN_';
				var ownVar = tooltip[ownField + timestamp];
				var ownVar_format = ownVar*100;

				var popupHTML = "Owner-occupied homes: "+ownVar_format.toFixed(2)+"%";

				feature.bindPopup(popupHTML);

				feature.on({
					mouseover: function(){
						feature.setStyle({"fillOpacity":"0.3", "opacity":"0.3"}); 			
					},
					mouseout: function(){
						feature.setStyle({"fillOpacity":"0", "opacity":"0"}); 					
					}
				});
	      	});
		}
   		
	}

	

	function setStyle(){
	
		ownershipLayer.eachLayer(function(layer){
					
			var attr = layer.feature.properties;
			// color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
		
			var ownField= 'OWN_';
		
					
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
	}

	$("#vcr-controls").css("display","initial");
	$("#slider").css("display","initial");
	$("#year-label").css("display","initial");
	$("#homeButton").css("display","initial");
	$("#map-menu").css("display","initial");
	
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

	skipValues = [
		document.getElementById('year-label'),
	];


	skipSlider.noUiSlider.on('update', function( values, handle ) {
	
		timestamp=Number(values[handle]);
	
		skipValues[handle].innerHTML = values[handle];
		setStyle();
		updateTooltips();

		if (timestamp==2020){
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		} else {
		
		}
	});


	playButton.addEventListener('click', function(){
		$('#vcr-play').addClass('active');
		play = setInterval(next, 1000);

	});

	pauseButton.addEventListener('click', function(){

		clearInterval(play);
		$('#vcr-play').removeClass('active');
	});

	refreshButton.addEventListener('click', function(){
		skipSlider.noUiSlider.set(1990);
		updateTimestamp = 1990;


	});

	//initial load (1990)

	setStyle();
	updateTooltips();
	
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
	}
}


