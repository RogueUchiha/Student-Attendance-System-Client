/* global google */
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const fences = {
  home: {
    center: { lat: 37.645, lng: -80.97 },
  },
  carterHall: {
    center: { lat: 37.776314, lng: -81.186365 },
  },
  lrc: {
    center: { lat: 37.7758, lng: -81.18408 },
  },
  aerb: {
    center: { lat: 39.646, lng: -79.9708 },
  },
  inn: {
    center: { lat: 37.77496, lng: -81.18377 },
  },
  lifeSciences: {
    center: {
      lat: 37.77501,
      lng: -81.18264,
    },
  },
  physicalSciences: {
    center: {
      lat: 37.77576,
      lng: -81.18366,
    },
  },
};

const beginClass = new Date();
beginClass.setHours(9, 0);
const endClass = new Date();
endClass.setHours(10, 0);
console.log(beginClass.toString());
console.log(endClass.toString());

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: fences.lrc.center,
    mapTypeId: "roadmap",
  });
  const homeFence = new google.maps.Circle({
    strokeColor: "FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "FF0000",
    map,
    center: fences.home.center,
    radius: 200,
  });

  const carterHallFence = new google.maps.Circle({
    strokeColor: "FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "FF0000",
    map,
    center: fences.carterHall.center,
    radius: 30,
  });
  const lrcFence = new google.maps.Circle({
    strokeColor: "FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "FF0000",
    map,
    center: fences.lrc.center,
    radius: 30,
  });
  const aerbFence = new google.maps.Circle({
    strokeColor: "FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "FF0000",
    map,
    center: fences.aerb.center,
    radius: 200,
  });
  const innFence = new google.maps.Circle({
    strokeColor: "FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "FF0000",
    map,
    center: fences.inn.center,
    radius: 30,
  });
  const lifeSciencesFence = new google.maps.Circle({
    strokeColor: "FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "FF0000",
    map,
    center: fences.lifeSciences.center,
    radius: 23,
  });
  const physcialSciencesFence = new google.maps.Circle({
    strokeColor: "FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "FF0000",
    map,
    center: fences.physicalSciences.center,
    radius: 23,
  });
  document.getElementById("btnFence").addEventListener("click", function () {
    checkFence(map, innFence);
  });

  //checkFence(map, lrcFence);
}

function checkFence(map, fence) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = position.coords;
        var currLocation = new google.maps.LatLng(pos.latitude, pos.longitude);
        // console.log(currLocation.lat());
        // var inFence =
        //   google.maps.geometry.spherical.computeDistanceBetween(
        //     currLocation,
        //     homeFence.getCenter()
        //   ) <= homeFence.getRadius();
        new google.maps.Marker({
          position: currLocation,
          map,
        });
        map.setCenter(currLocation);
        var inFence =
          google.maps.geometry.spherical.computeDistanceBetween(
            currLocation,
            fence.getCenter()
          ) <= fence.getRadius();
        console.log(inFence);
        console.log(fence.getRadius());
      },
      () => {
        handleLocationError(true);
      }
    );
    //console.log(pos.lat);
  } else {
    handleLocationError(false);
  }
}
function handleLocationError() {
  console.log("Location error");
}
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser";
//   }
//   console.log("hello");
//   function showPosition(position) {
//     var pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     };
//     var currLocation = new google.maps.LatLng(pos.lat, pos.lng);
//     setTimeout(function () {
//       google.maps.geometry.poly.containsLocation(currLocation, homeFence)
//         ? console.log(true)
//         : console.log(false);
//     }, 1000);
//   }
// }

const GoogleGeo = () => {
  const libraries = ["places, geometry"];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD1rHCSZhV_2u00P0Tp6BOujv3Gf6OfxCw",
    libraries,
  });

  return <GoogleMap></GoogleMap>;
};
export default GoogleGeo;
