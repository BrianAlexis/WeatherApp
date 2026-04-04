import type { WeatherData } from "../types/weatherData"
import { WeatherIcon } from "./WeatherIcon"

interface Props {
    weather: WeatherData
}

const WeatherDaily = ({ weather }: Props) => {

    const next24Hours = weather?.hourly.slice(0, 9)

    return (
        <div className="bg-linear-to-br from-blue-700/70 to-blue-300/70 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl my-6 overflow-x-hidden w-full animate-fade-weather">
            <p className="text-white ml-5 pb-4 border-b border-white/10 font-secondary text-sm">{weather.daily[0].summary}</p>
            <div className="flex gap-4 overflow-x-auto mt-">
                {next24Hours?.map((hour) => (
                    <div
                        key={hour.dt}
                        className="min-w-20 p-3 text-center text-white">

                        <p className="text-sm font-secondary">
                            {new Date(hour.dt * 1000).getHours()}:00
                        </p>

                        <div className="flex items-center justify-center mt-4 mb-4">
                            <WeatherIcon condition={hour.weather[0].main} size={30} />
                        </div>

                        <p className="text-sm font-bold">
                            {Math.round(hour.temp)}°
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default WeatherDaily