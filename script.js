const apiKey = "698e63dbe13247718bb84137251011"; // Replace with your WeatherAPI key

document.getElementById("getWeather").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const weatherDiv = document.getElementById("weather");

  if (city === "") {
    weatherDiv.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
    return;
  }

  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const name = data.location.name;
    const country = data.location.country;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const feelsLike = data.current.feelslike_c;

    weatherDiv.innerHTML = `
      <h2>${name}, ${country}</h2>
      <img src="https:${icon}" alt="${condition}">
      <h3>${temp}°C (Feels like ${feelsLike}°C)</h3>
      <p>${condition}</p>
      <p><b>Humidity:</b> ${humidity}%</p>
      <p><b>Wind Speed:</b> ${wind} km/h</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
