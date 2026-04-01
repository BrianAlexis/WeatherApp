
import { useState } from "react";
import { getWeatherByCity } from "./services/weatherService";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setWeather(null)
    setError(false)
    setLoading(true)

    if (!city.trim()) {
      setLoading(false)
      return
    }

    try {
      const data = await getWeatherByCity(city)
      setWeather(data)

    } catch (error) {
      setError(true)
      console.log({ error })
    } finally {
      setLoading(false)
    }

    setCity("")
  }

  return (
    <div className="min-h-screen bg-linear-to-br transition-all duration-1000 flex flex-col items-center justify-center p-6 bg-slate-800 relative">
      <div className="absolute inset-0 opacity-30"></div>
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">

        {/* Form */}
        <SearchBar
          city={city}
          handleSubmit={handleSubmit}
          setCity={setCity} />


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
