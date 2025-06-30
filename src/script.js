function refreshWeather(response){
    let temp = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let city = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    let time = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let icon = document.querySelector("#icon");

    city.innerHTML = response.data.city;
    temp.innerHTML = Math.round(temperature);

    time.innerHTML = formatDate(date);
    description.innerHTML = response.data.condition.description;
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
    temperature.innerHTML = Math.round(temperature);
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;


    
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

  

  
  


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
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


function searchCity(city){
    let apiKey = "c99a06af36400a3o817aacf43a5073bt";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
}




function handleSearch(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}




let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);


searchCity("calgary");
