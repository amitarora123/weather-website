const apikey = import.meta.env.VITE_API_KEY; // Vite-specific environment variable
console.log(apikey);
const hamburger = document.getElementById('hamburger');
const open_hamburger = document.getElementById('open');
const close_hamburger = document.getElementById('close');
const nav_toggle = document.getElementById('nav-toggle');
const inputElement = document.getElementById('input');
const searchBtn = document.getElementById('search_btn');
const new_date = document.getElementById('currentDate');
const place = document.getElementById('place');
const temp = document.getElementById('temperature');
const weatherType = document.getElementById('weatherType');
const pmr = document.getElementById('pmr');
const pm10 = document.getElementById('pm10');
const so2 = document.getElementById('so2');
const c_o = document.getElementById('co');
const n_o = document.getElementById('no');
const n_o2 = document.getElementById('no2');
const n_h3 = document.getElementById('nh3');
const o_3 = document.getElementById('o3');
const airQualityIndex = document.getElementById('airQualityIndex');
const sunSetTime = document.getElementById('sunSetTime');
const sunRiseTime = document.getElementById('sunRiseTime');
const currentLocation = document.getElementById('currentLocation');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const windSpeed = document.getElementById('windSpeed');
const feelsLike = document.getElementById('feelsLike');
const main_image = document.getElementById('main_image');

let res;
let location_value = 'delhi';
const arr = ['null', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
const colors = [
  'null',
  'bg-bg-btn',
  'bg-green-400',
  'bg-yellow-400',
  'bg-blue-400',
  'bg-red-700',
];

// Function to update the hamburger menu
const toggleHamburgerMenu = () => {
  open_hamburger.classList.toggle('opacity-0');
  open_hamburger.classList.toggle('rotate-90');
  close_hamburger.classList.toggle('opacity-0');
  close_hamburger.classList.toggle('rotate-90');
  nav_toggle.classList.toggle('translate-x-96');
};

// Function to set up the next 5 days forecast
const next5DaysWt = (res) => {
  let dayData = [];

  // Loop through the forecast data and group by date
  for (let i = 0; i < res.list.length; i++) {
    const dateInSeconds = new Date(res.list[i].dt * 1000);
    const date = dateInSeconds.toLocaleDateString('en-GB'); // 'dd/mm/yyyy' format

    if (!dayData.some((day) => day.date === date)) {
      dayData.push({
        date: date,
        temp: res.list[i].main.temp,
        timestamp: res.list[i].dt,
        icon: res.list[i].weather[0].icon,
      });
    }
  }

  // Display data for the next 5 days
  for (let i = 0; i < 5; i++) {
    const for_temp = document.getElementById(`for_temp_${i + 1}`);
    const day = dayData[i];
    const for_image = document.getElementById(`for_image_${i + 1}`);
    for_image.src = `https://openweathermap.org/img/wn/${day.icon}.png`;
    if (day) {
      for_temp.innerHTML = `${(day.temp - 273.15).toFixed(2)} &deg;`;

      const dateInSeconds = new Date(day.timestamp * 1000);
      const options = { day: '2-digit', month: 'short' };
      const current_date = dateInSeconds.toLocaleString('en-GB', options);

      const options1 = { weekday: 'short' };
      const current_day = dateInSeconds.toLocaleString('en-GB', options1);

      if (for_temp.nextElementSibling) {
        for_temp.nextElementSibling.innerText = current_date;
      }
      if (for_temp.nextElementSibling.nextElementSibling) {
        for_temp.nextElementSibling.nextElementSibling.innerText = current_day;
      }
    } else {
      console.log(`No data available for day ${i + 1}`);
    }
  }
};

const setMainImage = (url) => {
  main_image.src = `https://openweathermap.org/img/wn/${url}.png`;
};

const setHumidity = (val) => {
  humidity.innerText = val + '%';
};
const setPressure = (val) => {
  pressure.innerText = val + 'hPa';
};
const setVisibility = (val) => {
  visibility.innerText = val / 1000 + 'Km';
};
const setWindSpeed = (val) => {
  windSpeed.innerText = val + 'm/s';
};
const setFeelsLike = (val) => {
  feelsLike.innerHTML = `${(val - 273.14).toFixed(2)} &deg;C`;
};

// Function to update air quality data
const setAirQuality = (res_new) => {
  for (let i = 1; i <= 5; i++) {
    airQualityIndex.classList.remove(colors[i]);
  }
  airQualityIndex.classList.add(colors[res_new.list[0].main.aqi]);
  airQualityIndex.innerText = arr[res_new.list[0].main.aqi];
  pmr.innerText = res_new.list[0].components.pm2_5;
  pm10.innerText = res_new.list[0].components.pm10;
  so2.innerText = res_new.list[0].components.so2;
  c_o.innerText = res_new.list[0].components.co;
  n_o.innerText = res_new.list[0].components.no;
  n_o2.innerText = res_new.list[0].components.no2;
  n_h3.innerText = res_new.list[0].components.nh3;
  o_3.innerText = res_new.list[0].components.o3;
};

// Function to fetch data from APIs
const call_api = async () => {
  try {
    const locationResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location_value}&limit=1&appid=${apikey}`
    );
    const result = await locationResponse.json();
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${apikey}`
    );
    const result2 = await weatherResponse.json();
    const dateInSeconds = new Date(result2.dt * 1000);
    place.innerText = `${result2.name}, ${result2.sys.country}`;

    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const current_date = dateInSeconds.toLocaleString('en-GB', options);
    temp.innerHTML = `${(result2.main.temp - 273.15).toFixed(2)} &deg;`;
    new_date.innerText = current_date;
    weatherType.innerText = result2.weather[0].main;

    const option2 = { hour: '2-digit', minute: '2-digit', hour12: true };
    const riseTime = new Date(result2.sys.sunrise * 1000);
    const setTime = new Date(result2.sys.sunset * 1000);
    const sunrise = riseTime.toLocaleString('en-GB', option2);
    const sunset = setTime.toLocaleString('en-GB', option2);

    sunRiseTime.innerText = sunrise;
    sunSetTime.innerText = sunset;

    setMainImage(result2.weather[0].icon);
    setVisibility(result2.visibility);
    setWindSpeed(result2.wind.speed);
    setHumidity(result2.main.humidity);
    setPressure(result2.main.pressure);
    setFeelsLike(result2.main.feels_like);

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${result[0].lat}&lon=${result[0].lon}&appid=${apikey}`
    );
    res = await forecastResponse.json();
    next5DaysWt(res);

    const airQualityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${result[0].lat}&lon=${result[0].lon}&appid=${apikey}`
    );
    const res_new = await airQualityResponse.json();
    setAirQuality(res_new);
  } catch (error) {
    console.log('Error:', error);
  }
};

const cleanLocationName = (name) => {
  const unwantedWords = ['Tehsil', 'District', 'Taluka', 'Block']; // Add any other keywords here
  return unwantedWords
    .reduce((cleanedName, word) => {
      const regex = new RegExp(`\\s*${word}\\b`, 'i');
      return cleanedName.replace(regex, '');
    }, name)
    .trim();
};

const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        // Use OpenWeatherMap's reverse geocoding API
        const locationResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apikey}`
        );
        const locationData = await locationResponse.json();

        if (locationData && locationData.length > 0) {
          // Clean up the location name if it includes unwanted descriptors
          location_value = cleanLocationName(locationData[0].name);
          call_api(); // Call the API with the cleaned-up location name
        } else {
          console.log(
            'No location data found. Falling back to default location.'
          );
          location_value = 'Delhi'; // Fall back to Delhi
          call_api();
        }
      } catch (error) {
        console.error('Error fetching location name:', error);
        location_value = 'Delhi'; // Fall back to Delhi if there’s an error
        call_api();
      }
    },
    (error) => {
      console.error('Geolocation error:', error);
      location_value = 'Delhi'; // Fall back to Delhi if geolocation fails
      call_api();
    }
  );
};

currentLocation.addEventListener('click', getCurrentLocation);
// Function to get the user's current location

// Event listener to handle input change for location
inputElement.addEventListener('input', function () {
  location_value = inputElement.value;
});

// Search button event listener
searchBtn.addEventListener('click', () => {
  call_api();
});

inputElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // Enter key was pressed
    // Call your function or perform your action here
    call_api();
  }
});

// Hamburger menu event listener
hamburger.addEventListener('click', toggleHamburgerMenu);

// Initialize with default location (Delhi)
getCurrentLocation();
