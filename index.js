// darkmode
const toggleSwitch = document.getElementById("moon")
const body = document.querySelector('body')

toggleSwitch.addEventListener('click', function(){
this.classList.toggle('bi-sun-fill')


if(this.classList.toggle('bi-brightness-low-fill')){
    body.style.background = '#111111'
    body.style.color = '#FCFCFA'
    body.style.transition = '1s'
    
}else{
    (this.classList.toggle('bi-brightness-high-fill'))
    body.style.background = '#FCFCFA'
    body.style.color = '#17171F'
    body.style.transition = '1s'
}

})



// state
let currCity = "Manila";
let units = "metric";

// Selectors
let city = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-datetime");
let weatherForecast = document.querySelector(".weather-forecast");
let weatherTemperature = document.querySelector(".weather-temperature");
let weatherIcon = document.querySelector(".weather-icon");
let weatherMinmax = document.querySelector(".weather-minmax")
let weatherRealfeel = document.querySelector(".weather-realfeel");
let weatherHumidity = document.querySelector(".weather-humidity");
let weatherWind = document.querySelector(".weather-wind");
let weatherPressure = document.querySelector(".weather-pressure");

// search
document.querySelector(".weather-search").addEventListener('submit', e => {
    let search = document.querySelector(".weather-searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    currCity = search.value;
    // get weather forecast 
    getWeather();
    // clear form
    search.value = ""
})

// units
document.querySelector(".weather-unit-celsius").addEventListener('click', () => {
    if(units !== "metric"){
        // change to metric
        units = "metric"
        // get weather forecast 
        getWeather()
    }
})

document.querySelector(".weather-unit-farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        // change to imperial
        units = "imperial"
        // get weather forecast 
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone){
     const convertTimezone = timezone / 3600; // convert seconds to hours 

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("en-US", options)
   
}

 

// convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = '9c1f6de9d01a67b86520f9f60c0a14b7'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
    (data)
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
    weatherForecast.innerHTML = `<p>${data.weather[0].main}`
    weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weatherIcon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    weatherMinmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    weatherRealfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    weatherHumidity.innerHTML = `${data.main.humidity}%`
    weatherWind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}` 
    weatherPressure.innerHTML = `${data.main.pressure} hPa`
})
}

document.body.addEventListener('load', getWeather())