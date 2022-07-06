const key = "Gohv5Koh81GCN01HxAPNlxKeOK1BSvBc";

// getting weather

const getWeather = async (id) => {
  const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const res = await fetch(baseUrl + query);
  const data = await res.json();

  return data[0];
};

const getMinMax = async (id) => {
const baseUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
  const query = `${id}?apikey=${key}`;

  const res = await fetch(baseUrl + query);
  const data = await res.json();

  return data;
}

// getting city
const getCity = async (city) => {
  const baseUrl =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const res = await fetch(baseUrl + query);
  const data = await res.json();

  return data[0];
};

const openNav = () => {
  
}