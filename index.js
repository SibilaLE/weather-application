//import axios from "axios";
let current = new Date();
let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");
let date = current.getDate();
let hours = current.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = current.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[current.getDay()];
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

let month = months[current.getMonth()];

currentDate.innerHTML = `${day} ${month} ${date} , Today`;
currentTime.innerHTML = `Local Time ${hours} : ${minutes}`;

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

function showtemperature(response) {
  let Temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#weatherTemp");
  h2.innerHTML = `${Temperature}°`;
  let cityName = document.querySelector("#headingCity");
  cityName.innerHTML = response.data.name;

  document.getElementById("humidity").innerHTML = response.data.main.humidity;
  document.getElementById("feelsLike").innerHTML =
    response.data.main.feels_like;
  document.getElementById("wind_").innerHTML = response.data.wind.speed;
  console.log(response.data);
  document.getElementById("headingCountry").innerHTML =
    response.data.sys.country;
  console.log(response.data);
  document.getElementById("clouds_").innerHTML =
    response.data.weather[0].description;
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
