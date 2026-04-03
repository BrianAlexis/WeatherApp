
import { useState } from "react";
import { getCurrentWeather } from "./services/weatherService";
import { WeatherBackground } from "./components/WeatherBackground";

import type { WeatherData } from "./types/weatherData";

import { Map } from "./components/Map"
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import WeatherDaily from "./components/WeatherDaily";
import WeatherForecast from "./components/WeatherForecast";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";


function App() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSelectCity = async (lat: number, lon: number, name: string) => {
    setLoading(true);
    setError(false);

    try {
      const data = await getCurrentWeather(lat, lon);

      setWeather({
        cityName: name,
        country: data.timezone,
        lat,
        lon,
        ...data
      });

    } catch (error) {
      setError(true);
      console.log({ error })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br transition-all duration-1000 flex flex-col items-center justify-center p-6 bg-slate-800 relative">
      <div className="absolute inset-0 opacity-30">
        <WeatherBackground weather={weather} />
      </div>
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">

        {/* Form */}
        <SearchBar
          city={city}
          setCity={setCity}
          onSelectCity={handleSelectCity}
        />

        <div className="flex flex-col items-center">
          {loading && <Loader />}
          {error && <ErrorMessage message="City not found" />}
        </div>

        {weather && (
          <>
            <WeatherInfo weather={weather} />

            {/* Card */}
            <div className="w-full max-w-full top-35">
              <WeatherDaily weather={weather} />

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                <WeatherForecast weather={weather} />

                <Map lat={weather?.lat} lon={weather?.lon} />
              </div>
            </div>
          </>
        )}
      </div>
    </div >
  );
}

export default App;
