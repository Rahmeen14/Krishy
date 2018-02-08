 function initMap(location) {
         directionsService = new google.maps.DirectionsService();
          directionsDisplay = new google.maps.DirectionsRenderer();
          var loc = new google.maps.LatLng(location.coords.latitude,location.coords.longitude);
        map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          zoom: 7,
          center: loc,
          mapTypeId: 'terrain'
        });
        var marker = new google.maps.Marker({
          position: loc,
          map: map
        }); 
      
      }

   navigator.geolocation.getCurrentPosition(initMap);