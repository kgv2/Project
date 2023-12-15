function initMap() {
  //creates new map and defines the dimensions from the "map" tag; the default location is Babson College
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {lat:42.29646587870218, lng:-71.26569697426805}
  });
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  //finds the fileInput ID that accepts .json files -> reads the .json file by finding the lines 'est_lat' and 'est_lon'
  document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          if (json.est_lat && json.est_lon) {
            geocodeLatLng(
              geocoder,
              map,
              infowindow,
              json.est_lat,
              json.est_lon
            );
          } else {
            window.alert("Please provide a JSON file from the TeslaCam files!");
          }
        } catch (error) {
          window.alert("Error reading JSON file: " + error);
        }
      };
      reader.readAsText(file);
    }
  });
}
//mostly provided from the Google Maps Geocode API.
function geocodeLatLng(geocoder, map, infowindow, estLat, estLon) {
  const latlng = { lat: parseFloat(estLat), lng: parseFloat(estLon) };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        // Get the result location
        const resultLocation = response.results[0].geometry.location;

        // Set the map center and zoom to the result location
        map.setCenter(resultLocation);
        map.setZoom(16);

        const marker = new google.maps.Marker({
          position: resultLocation,
          map: map,
        });

        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}

window.initMap = initMap;
