$(document).ready(function(){
	




});

let geocoder  = null, 
	map = null, 
	marker = null,
	popup = null,
	currAddress = null,
	currLabel = 'M',
	currTitle = 'Mariupol';

function initMap() {

	 geocoder = new google.maps.Geocoder();

	 let select = document.getElementById('cities');

	 geocode(select.value);

	 select.addEventListener('change', function(){

	 	if (popup) popup.close();

	 	// currLabel = select.querySelector('[value="'+ select.value +'"]').innerText[0];

	 	console.log(currLabel);

	 	currTitle = select.querySelector('[value="'+ select.value +'"]').innerText;
	 	console.log(currTitle);


	 	geocode(select.value);

	 });

	let center = {
		lat: 47.1225096, 
		lng: 37.4418794
	};

	map = new google.maps.Map(document.getElementById('map'), {
		center	: center,
		zoom 	:	15
	});

	window.addEventListener('resize', function(){
		map.setCenter(center);
	});

	map.addListener('zoom_changed', function() {
		map.setCenter(center);  // при изменении зума маркер в центре остается, центрированный
	});

	//marker.setPosition(newPosition)

	//setInterval(function() {
//
	// }, 2000);





}



function geocode(addressStr) {

	geocoder.geocode({address: addressStr}, function(res, stat) {
		
	//geocoder.geocode({coords: search}, function() {
		if (stat == 'OK') {
			let coords =  {
				lat: res[0].geometry.location.lat(),
				lng: res[0].geometry.location.lng()
			};
			console.log(stat);
			console.log(res);
			console.log(coords);


			currAddress = res[0].formatted_address;
			map.setCenter(coords);

			showMarker(coords);

			

		} else {
			alert(`Ooops! Request status is ${stat}. Try again later`)
		}

	});
}

function showMarker(coords) {

	//  let select = document.getElementById('cities');

	// select.value[0];
	// console.log(select.value[0]);

	if (marker) {
		marker.setPosition(coords);
		marker.setLabel(currTitle.charAt(0));
		marker.setTitle(currTitle);
	} else {
		marker = new google.maps.Marker({
			position: coords, 
			map: map,
			// title: 'Label',
			title: currTitle,
			// label: select[0],
			label: currTitle.charAt(0),
			icon: 'favicon.ico'
		});

		marker.addListener('click', function() {
	    	showPopup();
	  });
	}

	
}

function showPopup() {
	console.log(currAddress);
	if (popup) {
		popup.setContent(getPopupContent());

	} else {
		popup = new google.maps.InfoWindow({
	    content: getPopupContent()
	  });
	}

	popup.open(map, marker);
}

function getPopupContent() {
	return `<h1>Address: </h1> ${currAddress}`
}

