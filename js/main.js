function loadOwnership() {
	
    activeLayers.clearLayers();
	var ownershipLayer = L.mapbox.featureLayer(censusHex);
	ownershipLayer.addTo(activeLayers);
	
	function onEachFeature(layer) {
		var ownField= 'OWN_';
		var ownershipVar = layer.feature.properties[ownField + timestamp];
		var percentage = ownershipVar*100
	
		var popupHTML = "Owner-occupied homes: "+percentage.toFixed(2)+"%"+timestamp;

		layer.bindPopup(popupHTML);
				
	}

	function setStyle(){
	
		ownershipLayer.eachLayer(function(layer){
			
			onEachFeature(layer);
			var attr = layer.feature.properties;
			// color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
		
			var ownField= 'OWN_';
		
			layer.on({
				mouseover: function(){
					layer.setStyle({"fillOpacity":"0.1"}); 			
				},
				mouseout: function(){
					layer.setStyle({"fillOpacity":"1"}); 					
				}
			});
					
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
			
			if(timestamp==2020 && attr[ownField + timestamp] <= 0.5){
				layer.setStyle({
					fillColor:"rgba(239,243,255,0.75)"
				});
			}else if(timestamp==2020 &&attr[ownField + timestamp] > 0.9){
				layer.setStyle({
					fillColor:"rgba(8,81,156,0.75)"
				});
			
			}else if(timestamp==2020 &&attr[ownField + timestamp] > 0.8){
				layer.setStyle({
					fillColor:"rgba(49,130,189,0.75)"
				});
			
			}else if(timestamp==2020 &&attr[ownField + timestamp] > 0.7){
				layer.setStyle({
					fillColor:"rgba(107,174,214,0.75)"
				});
			
			}else if(timestamp==2020 &&attr[ownField + timestamp] > 0.6){
				layer.setStyle({
					fillColor:"rgba(158,202,225,0.75)"
				}); 
				
			}else if(timestamp==2020 &&attr[ownField + timestamp] > 0.5){
				layer.setStyle({
					fillColor:"rgba(239,243,255,0.75)"
				}); 
				  
			}else{

			}
		});
	}

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



	function next() {

		if (timestamp == 1990) {
	
		updateTimestamp = timestamp + 10;
	
		setStyle();
		skipSlider.noUiSlider.set(updateTimestamp);


		} else if (timestamp == 2000){
		updateTimestamp = timestamp + 9;
	
		setStyle();
		skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp < 2014){
		updateTimestamp = timestamp + 1;
	
		setStyle();
		skipSlider.noUiSlider.set(updateTimestamp);

		} else if (timestamp == 2014){
		updateTimestamp = timestamp + 6;
	
		setStyle();
		skipSlider.noUiSlider.set(updateTimestamp);
		document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		
		} else {
		clearInterval(play);
		}
	}
}

function loadAffordability() {
	activeLayers.clearLayers();
    
	var affordLayer = L.mapbox.featureLayer(SFaffordHex);
	affordLayer.addTo(activeLayers);

	function onEachFeature(layer) {
		var intrstField = 'intrst_20';
		var hudmfiField= 'hudmfi';
		var interest = layer.feature.properties[intrstField + timestamp];
		var intPercentage = interest*100;
		var hudMFI = layer.feature.properties[hudmfiField + timestamp];
		
		var popupHTML = "Interest rate: "+intPercentage.toFixed(2)+"%<br>HUD MFI: $"+hudMFI.toLocaleString();

		layer.bindPopup(popupHTML);
				
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
			onEachFeature(layer);
			var attr = layer.feature.properties;
			// color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
		
		
			var slsField = 'numSls_';
			var affdField = 'affd';
		
			layer.on({
				mouseover: function(){
					layer.setStyle({"fillOpacity":"0.1"}); 			
				},
				mouseout: function(){
					layer.setStyle({"fillOpacity":"1"}); 					
				}
			});
		
			if(attr[slsField + timestamp] < 3){
				layer.setStyle({
					fillColor:"rgb(235, 235, 235)"
				});
			}else if(attr[affdField + timestamp] > 0.5 && attr[slsField + timestamp] >= 3){
				layer.setStyle({
					fillColor:"rgb(215,48,39)"
				}); 
			}else if(attr[affdField + timestamp] > 0.4 && attr[slsField + timestamp] >= 3){
				layer.setStyle({
					fillColor:"rgb(252,141,89)"
				}); 
			}else if(attr[affdField + timestamp] > 0.3 && attr[slsField + timestamp] >= 3){
				layer.setStyle({
					fillColor:"rgb(254,224,149)"
				}); 
			}else if(attr[affdField + timestamp] > 0.25 && attr[slsField + timestamp] >= 3){
				layer.setStyle({
					fillColor:"rgb(217,239,149)"
				});	
			}else if(attr[affdField + timestamp] >= 0.2 && attr[slsField + timestamp] >= 3){
				layer.setStyle({
					fillColor:"rgb(145,207,96)"
				});
			}else if(attr[affdField + timestamp] < 0.2 && attr[slsField + timestamp] >= 3){
				layer.setStyle({
					fillColor:"rgb(26,152,80)"
				});
			
				  
			}else{

			}
			
			if (timestamp == 2020 && attr[affdField + timestamp] > 0.5){
					layer.setStyle({
					fillColor:"rgba(215,48,39,0.75)"
				});
		
			}else if(timestamp == 2020 && attr[affdField + timestamp] > 0.4){
				layer.setStyle({
					fillColor:"rgba(252,141,89,0.75)"
				}); 
			}else if(timestamp == 2020 && attr[affdField + timestamp] > 0.3){
				layer.setStyle({
					fillColor:"rgba(254,224,149,0.75)"
				}); 
			}else if(timestamp == 2020 && attr[affdField + timestamp] > 0.25){
				layer.setStyle({
					fillColor:"rgba(217,239,149,0.75)"
				});	
			}else if(timestamp == 2020 && attr[affdField + timestamp] >= 0.2){
				layer.setStyle({
					fillColor:"rgba(145,207,96,0.75)"
				});
			}else if(timestamp == 2020 && attr[affdField + timestamp] < 0.2){
				layer.setStyle({
					fillColor:"rgba(26,152,80,0.75)"
				});
			
			} else {
			}
		});
	}

	skipSlider = document.getElementById('slider');
	playButton = document.getElementById('vcr-play');
	pauseButton = document.getElementById('vcr-pause');
	refreshButton = document.getElementById('vcr-refresh');

	noUiSlider.create(skipSlider, {
	animate: true,
	animationDuration: 1000,
	range: {
		'min': 2000,
		'6%': 2001,
		'12%': 2002,
		'18%': 2003,
		'24%': 2004,
		'30%': 2005,
		'36%': 2006,
		'42%': 2007,
		'48%': 2008,
		'54%': 2009,
		'60%': 2010,
		'66%': 2011,
		'72%': 2012,
		'78%': 2013,
		'84%': 2014,
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


	setStyle();

	function next() {

		if (timestamp < 2014){
 			updateTimestamp = timestamp + 1;
			setStyle();
			skipSlider.noUiSlider.set(updateTimestamp);

	
		} else if (timestamp == 2014){
			updateTimestamp = timestamp + 6;
			setStyle();
			skipSlider.noUiSlider.set(updateTimestamp);
			document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
			
		} else {
			clearInterval(play);
		}
	}
}

function loadVulnerability(){
	activeLayers.clearLayers();
	
	var vulnerability = L.mapbox.featureLayer(censusHex);
	vulnerability.addTo(activeLayers);
	
	function onEachFeature(layer) {
		var vIndexField= 'SC_TOT_';
		var vIndexVar = layer.feature.properties[vIndexField + timestamp];
		
	
		var popupHTML = "Displacement Vulnerability Score: "+vIndexVar;

		layer.bindPopup(popupHTML);
				
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
			
			onEachFeature(layer);
			var attr = layer.feature.properties;
			// color
			layer.setStyle({
				weight: 1,
				color: 'rgba(255,255,255,1)',
				fillOpacity: 1
			});
		
			var vulnField= 'SC_TOT_';
			
			layer.on({
				mouseover: function(){
					layer.setStyle({"fillOpacity":"0.1"}); 			
				},
				mouseout: function(){
					layer.setStyle({"fillOpacity":"1"}); 					
				}
			});
			
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
			
			if(timestamp==2020 && attr[vulnField + timestamp] === 0){
				layer.setStyle({
					fillColor:"rgba(235,235,235,0.75)"
				});
			}else if(timestamp==2020 && attr[vulnField + timestamp]=== 1){
				layer.setStyle({
					fillColor:"rgba(254,229,217,0.75)"
				});
			
			}else if(timestamp==2020 && attr[vulnField + timestamp] === 2){
				layer.setStyle({
					fillColor:"rgba(252,174,145,0.75)"
				});
			
			}else if(timestamp==2020 && attr[vulnField + timestamp] === 3){
				layer.setStyle({
					fillColor:"rgba(251,106,74,0.75)"
				});
			
			}else if(timestamp==2020 && attr[vulnField + timestamp] === 4){
				layer.setStyle({
					fillColor:"rgba(203,24,29,0.75)"
				}); 
		  
			}else{

			}
		});
	}


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
		skipSlider.noUiSlider.set(updateTimestamp);


		} else if (timestamp == 2000){
		updateTimestamp = timestamp + 9;
	
		setStyle();
		skipSlider.noUiSlider.set(updateTimestamp);
	
		} else if (timestamp < 2014){
		updateTimestamp = timestamp + 1;
	
		setStyle();
		skipSlider.noUiSlider.set(updateTimestamp);

		} else if (timestamp == 2014){
		updateTimestamp = timestamp + 6;
	
		setStyle();
		skipSlider.noUiSlider.set(updateTimestamp);
		document.getElementById('year-label').innerHTML = "2020 <p>(projected)</p>";
		
		} else {
		clearInterval(play);
		}
	}




}

