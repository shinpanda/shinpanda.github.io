const API_KEY = "acf60bdaa6aabc3ae5b5a819e04ac47f";
const GEO_POSITION = "coords";
let coords = {};

function saveGeo(coords) {
  localStorage.setItem(GEO_POSITION, JSON.stringify(coords));
}

function printWeather({ lat, lon }) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}

function onGeoOk(position) {
  const { latitude: lat, longitude: lon } = position.coords;
  coords = { lat, lon };
  saveGeo(coords);
  printWeather(coords);
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

const savedCoords = localStorage.getItem(GEO_POSITION);
if (savedCoords) {
  coords = JSON.parse(savedCoords);
  printWeather(coords);
} else {
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}
