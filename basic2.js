function map(data){
	var map = L.map('map').setView([12,-1.5], 6); // africa

	L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	  maxZoom: 18,
	  id: 'examples.map-i86knfo3'
	}).addTo(map);


	var mapTiles = L.vectorGrid.protobuf("https://itos-humanitarian.s3.amazonaws.com/v1/VectorTile/COD_BFA/Admin1/{z}/{x}/{y}.pbf", {
		vectorTileLayerStyles: {
			    'Admin1':function(properties) {
			    	let value = data[properties['admin1Pcode']];
			    	color = '#ffffff'
			    	if(value == undefined){
			    		console.log(properties['admin1Pcode']);
			    	}
			    	if(value>0){
			    		color = '#90CAF9'
			    	}
			    	if(value>10){
			    		color = '#42A5F5'
			    	}
			    	if(value>100){
			    		color = '#0D47A1'
			    	}
			    	return {
				        weight: 2,
				        fill: '#9bc2c4',
				        color: color,
				        dashArray: '3',
				        fillOpacity: 0.7
				    }
			    }
		}
	}).addTo(map);
}

function loadData(){
	let dataURL = 'https://proxy.hxlstandard.org/data.json?dest=data_edit&filter01=count&count-tags01=%23adm1%2Bcode&count-type01-01=count&count-header01-01=Count&count-column01-01=%23meta%2Bcount&strip-headers=on&url=https%3A%2F%2Fdata.humdata.org%2Fdataset%2Fburkina-faso-presence-operationnelle'

	$.ajax({ 
	    type: 'GET', 
	    url: dataURL,
	    dataType: 'json',
	    success:function(response){
	    	let data = processData(response);
	    	map(data);
	    }
	});	
}

function processData(data){
	output = {}
	data.forEach(function(d,i){
		if(i>1){
			output[d[0]] = d[1];
		}
	});
	return output;
}

loadData()
