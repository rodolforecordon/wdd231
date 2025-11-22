const key = '8b880cfc64e35901a288f7938f74893c';
const lat = '40.61667';
const lon = '-8.45';

function getUrl(apiName, lat, lon, key) {
  return `https://api.openweathermap.org/data/2.5/${apiName}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
}

async function readWeatherInfo() {
  const url = getUrl('weather', lat, lon, key);
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (err) {
    console.log(err);
  }

  function displayWeather(data) {
    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').innerHTML = `<img src="${iconURL}" alt="weather icon">`;

    document.getElementById('temp').innerHTML = `${data.main.temp}&deg;C`;
    document.getElementById('weather-desc').innerHTML = data.weather[0].description;
    document.getElementById('temp-max').innerHTML = `Max: ${data.main.temp_max}&deg;C`;
    document.getElementById('temp-min').innerHTML = `Min: ${data.main.temp_min}&deg;C`;
    document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}%`;

    const sunriseHour = new Date(data.sys.sunrise).getHours();
    const sunriseMin = new Date(data.sys.sunrise).getMinutes();
    const sunsetHour = new Date(data.sys.sunset).getHours();
    const sunsetMin = new Date(data.sys.sunset).getMinutes();
    document.getElementById('sunrise').innerHTML = `Sunrise: ${sunriseHour}:${sunriseMin}`;
    document.getElementById('sunset').innerHTML = `Sunset: ${sunsetHour}:${sunsetMin}`;
  }
}

async function readForecastInfo() {
  const url = getUrl('forecast', lat, lon, key);
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (err) {
    console.log(err);
  }

  function displayWeather(data) {
    console.log(data);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const forecast1WeekDay = weekdays[new Date(data.list[5].dt_txt).getDay()];
    const forecast1Temp = data.list[5].main.temp;
    document.getElementById('forecast-1').innerHTML = `${forecast1WeekDay}: ${forecast1Temp}&deg;C`;

    const forecast2WeekDay = weekdays[new Date(data.list[12].dt_txt).getDay()];
    const forecast2Temp = data.list[12].main.temp;
    document.getElementById('forecast-2').innerHTML = `${forecast2WeekDay}: ${forecast2Temp}&deg;C`;

    const forecast3WeekDay = weekdays[new Date(data.list[20].dt_txt).getDay()];
    const forecast3Temp = data.list[20].main.temp;
    document.getElementById('forecast-3').innerHTML = `${forecast3WeekDay}: ${forecast3Temp}&deg;C`;
  }
}

readWeatherInfo();
readForecastInfo();
