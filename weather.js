let myKey = "6c4a8de7e41d00fc03a15b5bc5aa62a4";
let city = document.getElementById("search");
// let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
let itemHTML = document.getElementById("itemHTML");

async function weather(cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKey}`;
  try {
    let result = await fetch(url);
    let data = await result.json();
    console.log(data);
    let document = (data) => {
      return {
        name: data.name,
        feels_like: (data.main.feels_like - 273.15).toFixed(0),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temp: (data.main.temp - 273.15).toFixed(0),
        visibility: data.visibility / 1000,
        sys: data.sys.country,
        description: data.weather.map((result) => {
          return result.description;
        }),
        weather: data.weather.map((result) => {
          return `http://openweathermap.org/img/w/${result.icon}.png`;
        }),
        main_description: data.weather.map((result) => {
          return result.main;
        }),
      };
    };

    let processdata = document(data); //把資料丟進去！！
    weatherWrap(processdata);
    // console.log(document.feels_like);
  } catch (e) {
    console.log(e);
  }
}
let weatherWrap = (allData) => {
  let weatherText = `
  <p class="city">City: ${allData.name}</p>
  <img src="${allData.weather[0]}" class="picture"/><span class="temp">${allData.temp}°c</span>
  <p>Feel like: <span class="context">${allData.feels_like}°c.${allData.description}.${allData.main_description}.</span></p>
  <div>
  <p>Humidity: <span class="context">${allData.humidity} %</span></p>
  <p>Pressure: <span class="context">${allData.pressure} hPa</span></p>
  <p>Visibility: <span class="context">${allData.visibility} km</span></p>
  </div>
  `;
  itemHTML.innerHTML = weatherText;
  console.log(allData.weather);
  console.log(allData);
};
city.addEventListener("change", () => {
  let cityName = city.value + ", TW";

  weather(cityName);
});

weather();
