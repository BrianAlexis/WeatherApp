
import { useState } from "react";
import { getWeatherByCity } from "./services/weatherService";

import type { WeatherData } from "./types/weatherData";

import { CloudOff, Droplets, Gauge, Search, Wind } from "lucide-react";
import { WeatherIcon } from "./components/WeatherIcon";

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
    } finally {
      setLoading(false)
    }

    setCity("")
  }

  return (
    <div className="min-h-screen bg-linear-to-br transition-all duration-1000 flex flex-col items-center justify-center p-6 bg-slate-800 relative">
      <div className="absolute inset-0 opacity-30"></div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col">

        {/* Form */}
        <form className="w-full max-w-md fixed top-6 left-1/2 -translate-x-1/2 z-50" onSubmit={handleSubmit}>
          <div className="relative group">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Buscar ciudad..."
              className="w-full px-6 py-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 group-hover:bg-white/15"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
            >
              <Search size={20} className="text-white" />
            </button>
          </div>
        </form>


        <div className="flex flex-col items-center">

          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-300/50 rounded-2xl p-6 text-white max-w-md">
              <div className="flex items-center gap-3">
                <CloudOff size={32} />
                <div>
                  <h3 className="font-semibold text-lg">Ciudad no encontrada</h3>
                </div>
              </div>
            </div>
          )}

          {/* Card */}

          {weather && (
            <div className="w-full max-w-md fixed top-35">
              <div /*className="bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"*/>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">
                    {weather.cityName}, {weather.country}
                  </h2>
                </div>

                {/* <div className="flex items-center justify-center mb-4">
                  <WeatherIcon condition={weather.current.weather[0].main} size={120} />
                </div> */}

                <div className="text-center">
                  <div className="text-7xl font-bold text-white">
                    {Math.floor(weather.current.temp)}°
                  </div>
                  <p className="text-white/80 text-lg capitalize">
                    {weather.current.weather[0].main}
                  </p>
                  {/* <div className="text-white/70 text-lg">
                    F{Math.floor(weather.current.feels_like)}°
                  </div> */}
                  <div className="flex">
                    <div>
                      F:{Math.floor(weather.current.feels_like)}
                    </div>
                    <div>
                      H: {weather.current.humidity} %
                    </div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
                    <Droplets className="text-blue-300 mb-2 mx-auto" size={24} />
                    <div className="text-white/70 text-sm mb-1">Humedad</div>
                    <div className="text-white text-xl font-semibold">
                      {weather.current.humidity} %
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
                    <Wind className="text-green-300 mb-2 mx-auto" size={24} />
                    <div className="text-white/70 text-sm mb-1">Viento</div>
                    <div className="text-white text-xl font-semibold">
                      {weather.current.wind_speed} m/s
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
                    <Gauge className="text-purple-300 mb-2 mx-auto" size={24} />
                    <div className="text-white/70 text-sm mb-1">Presión</div>
                    <div className="text-white text-xl font-semibold">
                      {weather.current.pressure}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}

export default App;
