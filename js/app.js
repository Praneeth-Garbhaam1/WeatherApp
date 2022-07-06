const cityForm = document.querySelector("form");
const content = document.querySelector(".location");
const high = document.querySelector(".high");
const low = document.querySelector(".low");
const imgEle = document.querySelector("img");

const updateUI = (data) => {
    console.log('data',data);
    const cityName = data.cityDetails.EnglishName;
    const country = data.cityDetails.Country.EnglishName;
    const isDay = data.cityWeather;
    const weather = Math.floor(data.cityWeather.Temperature.Metric.Value);
    const weatherStatus = data.cityWeather.WeatherText;
    const min = Math.floor(data.minMax.DailyForecasts[0].Temperature.Minimum.Value);
    const max = Math.floor(data.minMax.DailyForecasts[0].Temperature.Maximum.Value);
    const minval = Math.floor((min-32)*5/9);
    const maxval = Math.floor((max-32)*5/9);
    content.innerHTML = `
    <h2>${cityName}, ${country}</h2>
    <h1><span class="num" data-value="32">${weather}</span>°C <i class="fa fa-cloud"></i></h1>
    <p>${weatherStatus}</p>
    `;
    high.innerHTML = `
        <span>${maxval}°C</span>
        <span>High</span>
    `;
    low.innerHTML = `
        <span>${minval}°C</span>
        <span>Low</span>
    `;

    //updating image
    let imgSrc = null;
    console.log(isDay);

      if (isDay.IsDayTime) {
        imgSrc = "assets/25501.jpg";
      } else {
        imgSrc = "assets/nightsky.jpg";
      }

    imgEle.setAttribute("src", imgSrc);
}


const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    console.log('cityDetails',cityDetails);
    const cityWeather = await getWeather(cityDetails.Key);
    const minMax = await getMinMax(cityDetails.Key);
    return {
        cityDetails:cityDetails,
        cityWeather:cityWeather,
        minMax: minMax
    }
}

cityForm.addEventListener("submit", (e) => {
    //preventing default
    e.preventDefault();

    //getting city
    const city = cityForm.search.value.trim();
    console.log('city',city);
    cityForm.reset();

    //updateUI
     updateCity(city)
    .then((data) => {
        console.log('data inside updatecity',updateCity)
      updateUI(data);
    })
    .catch((err) => console.log(err));
});

window.onload = (event) => {
  console.log(navigator.geolocation.getCurrentPosition);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      document.getElementById("demo").innerHTML =
      "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
      const lat  = position.coords.latitude;
      const long = position.coords.longitude
      getReverseGeocodingData(lat,long)
      return {
        latitude: lat,
        longitude: long
      }

    }
    console.log('page fully loaded')
    //getting city
    const city = 'visakhapatnam';
    console.log('city',city);

    //updateUI
     updateCity(city)
    .then((data) => {
        console.log('data inside updatecity',updateCity)
      updateUI(data);
    })
    .catch((err) => console.log(err));


};

const getReverseGeocodingData = (lat, lng) => {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng },  (results, status) =>{
        if (status !== google.maps.GeocoderStatus.OK) {
            // alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            var address = (results[0].formatted_address);
        }
    });
}