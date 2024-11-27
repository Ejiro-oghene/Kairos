/** @format */
function regenerateWeather(response) {
  let temperatureElement = document.querySelector("#app-temperature");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#weather-description");
  let cityElement = document.querySelector("#app-city");
  let humidityElement = document.querySelector("#app-humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = configureDate(date);
  windElement.innerHTML = ` ${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = ` ${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
}

function configureDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function citySearch(city) {
  let apiKey = "971666041co003fba6800ebft2ef2e87";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(regenerateWeather);
}

function initiateSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  citySearch(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", initiateSearchSubmit);

citySearch("Texas");
