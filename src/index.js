function formatDate(timeStamp) {
  let currentDate = new Date(timeStamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayCurrentWeather(response) {
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#current-weather-icon");
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );

  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = ` ${response.data.condition.description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  dateElement.innerHTML = formatDate(response.data.time);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="Weather icon" />`;
  currentTemperatureElement.innerHTML = Math.round(
    response.data.temperature.current
  );
}

function searchCity(city) {
  let apiKey = "0t4706adf77ffaa2o33b167a49d7a624";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Tembisa");
