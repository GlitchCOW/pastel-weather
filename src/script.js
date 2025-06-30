function refreshWeather(response){
    let temp = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let city = document.querySelector("#city");

    city.innerHTML = response.data.city;
    temp.innerHTML = Math.round(temperature);
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
