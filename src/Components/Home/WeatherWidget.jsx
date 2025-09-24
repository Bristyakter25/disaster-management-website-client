import { useEffect, useState } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  Thermometer,
  Droplet,
  Wind,
  Sunrise,
  Sunset,
} from "lucide-react";

const districts = [
  "Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet",
  "Rangpur", "Mymensingh", "Comilla", "Jessore"
];

const WeatherWidget = () => {
  const [city, setCity] = useState("Dhaka");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},BD&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <Sun className="text-yellow-500" size={48} />;
      case "Clouds":
        return <Cloud className="text-gray-500" size={48} />;
      case "Rain":
        return <CloudRain className="text-blue-500" size={48} />;
      case "Thunderstorm":
        return <CloudLightning className="text-purple-500" size={48} />;
      default:
        return <Sun className="text-yellow-500" size={48} />;
    }
  };

  const formatTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().slice(-12, -7);
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 p-6 rounded-3xl shadow-2xl w-full md:w-96">
      {/* District Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Select District:</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-xl shadow-sm hover:shadow-md transition"
        >
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-500 text-center">Loading weather...</p>}
      {!loading && (!weather || weather.cod !== 200) && (
        <p className="text-red-500 text-center font-semibold">Unable to fetch weather data</p>
      )}

      {/* Weather Info */}
      {weather && weather.cod === 200 && (
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Weather in {weather.name}</h2>
            {getWeatherIcon(weather.weather[0].main)}
          </div>

          {/* Temperature */}
          <div className="flex items-center gap-4 text-gray-700 text-lg font-semibold">
            <Thermometer size={24} className="text-red-500" />
            <span className="text-3xl">{Math.round(weather.main.temp)}°C</span>
            <span className="text-sm italic text-gray-600">Feels like: {Math.round(weather.main.feels_like)}°C</span>
          </div>

          {/* Condition & Alerts */}
          <p className="text-gray-700 capitalize">{weather.weather[0].description}</p>
          {["Rain", "Thunderstorm"].includes(weather.weather[0].main) && (
            <div className="bg-blue-200 text-blue-800 p-2 rounded-lg font-medium">
              ⚠️ Weather Alert: {weather.weather[0].main} expected
            </div>
          )}

          {/* Extra Info Grid */}
          <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
            <div className="flex items-center gap-2">
              <Droplet size={20} className="text-blue-500" />
              Humidity: {weather.main.humidity}%
            </div>
            <div className="flex items-center gap-2">
              <Wind size={20} className="text-gray-500" />
              Wind: {weather.wind.speed} m/s
            </div>
            <div className="flex items-center gap-2">
              <Sunrise size={20} className="text-yellow-500" />
              Sunrise: {formatTime(weather.sys.sunrise, weather.timezone)}
            </div>
            <div className="flex items-center gap-2">
              <Sunset size={20} className="text-orange-500" />
              Sunset: {formatTime(weather.sys.sunset, weather.timezone)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
