//import axios from "axios";

function search(city) {
  let apiKey = "f21167f56335ae8011dcc6a6fa773597";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showtemperature);
}
// function search was created to show a city with real information when user reload the page.
// search (Lima) is in the botton of the page caaling the function search city which is calling
//the function showtemperature which contains all the weather behavior
function SearchCelcius(event) {
  event.preventDefault();
  let searchForm = document.getElementById("search-form");
  let h1 = document.getElementById("headingCity");
  if (searchForm.value) {
    h1.innerHTML = `${searchForm.value}`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchForm.value}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appaid=${apiKey}`).then(showtemperature);
  } else {
    alert("Please enter a city");
  }
}
//delete DOWN
function clickCel(event) {
  event.preventDefault();
  let celTemp = document.querySelector("#weatherTemp");
  celTemp.innerHTML = `-12°`;
}
function clickfah(event) {
  event.preventDefault();
  let fahTemp = document.querySelector("#weatherTemp");
  fahTemp.innerHTML = `10.4°`;
}

let link = document.querySelector("#temp-cel");
link.addEventListener("click", clickCel);

let linkF = document.querySelector("#temp-Fah");
linkF.addEventListener("click", clickfah);
//delete UP
const formSearch = document.getElementById("search-city-form");
formSearch.addEventListener("submit", SearchCelcius);

let apiKey = "f21167f56335ae8011dcc6a6fa773597";

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Local Time ${hours}:${minutes}`;
}
function formatCity(timestamp) {
  let date = new Date(timestamp);
  let dateC = date.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesdy",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Ap",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Set",
    "Oct",
    "Now",
    "Dic",
  ];

  let month = months[date.getMonth()];
  return `${day} ${month} ${dateC}, Today`;
}

function showtemperature(response) {
  let Temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#weatherTemp");
  h2.innerHTML = `${Temperature}°`;
  let cityName = document.querySelector("#headingCity");
  cityName.innerHTML = response.data.name;

  document.getElementById("humidity").innerHTML = response.data.main.humidity;
  document.getElementById("feelsLike").innerHTML =
    response.data.main.feels_like;

  console.log(JSON.stringify(response.data));
  console.log(response.data.main.humidity);
  document.getElementById("wind_").innerHTML = response.data.wind.speed;
  document.getElementById("headingCountry").innerHTML =
    response.data.sys.country;
  document.getElementById("clouds_").innerHTML =
    response.data.weather[0].description;

  document.getElementById("current-date").innerHTML = formatCity(
    response.data.dt * 1000
  );
  document.getElementById("current-time").innerHTML = formatTime(
    response.data.dt * 1000
  );
}
// current location
function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "f21167f56335ae8011dcc6a6fa773597";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlF = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlF).then(showtemperature);
}

function get_CurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let locationB = document.querySelector(".current");
locationB.addEventListener("click", get_CurrentPosition);

search("Lima");
