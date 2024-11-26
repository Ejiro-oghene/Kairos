/** @format */
function regenerateWeather(response) {
  let temperatureElement = document.querySelector("#app-temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#app-city");
  cityElement.innerHTML = response.data.city;
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
