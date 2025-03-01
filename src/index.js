/** @format */
function regenerateWeather(response) {
  let cityElement = document.querySelector("#app-city");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#app-humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#app-temperature");
  let temperature = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = configureDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = ` ${response.data.temperature.humidity}%`;
  windElement.innerHTML = ` ${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  temperatureElement.innerHTML = Math.round(temperature);
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

function showForecast() {
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-days">
       <div class="weather-forecast-date">${day}</div>
       <div class="weather-forecast-icon">⛅</div>
       <div class="weather-forecast-temps">
        <div class="weather-forecast-temp">
         <strong>13°</strong>
        </div>
        <div class="weather-forecast-temp">8°</div>
       </div>
      </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", initiateSearchSubmit);

citySearch("Texas");
showForecast();
