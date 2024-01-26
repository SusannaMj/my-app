import "./App.css";
import useState from "react-usestateref";
import axios from "axios";

function App() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded === false) {
    return (
      <div>
        {form}
        <h1>
          This project is{" "}
          <a
            href="https://profound-alfajores-e3a10e.netlify.app"
            target="_blank"
          >
            open-sourced
          </a>
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        {form}

        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>
          <li>
            <img src={weather.icon} alt="Weather icon" />
          </li>
        </ul>
        <h1>
          This project is{" "}
          <a
            href="https://profound-alfajores-e3a10e.netlify.app"
            target="_blank"
          >
            open-sourced
          </a>
        </h1>
      </div>
    );
  }

  function displayWeather(response) {
    setLoaded("true");
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9e215efc106c765d44690271c6c7636c&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
}

export default App;
