import type { WeatherData } from "../types/weatherData"
import { WeatherIcon } from "./WeatherIcon"

interface Props {
    weather: WeatherData
}

const WeatherDaily = ({ weather }: Props) => {

    const next24Hours = weather?.hourly.slice(0, 9)

    return (
        <div className="bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl mt-10 mb-10 overflow-x-hidden w-full">
            <p className="text-white ml-6">Partly cloudy conditions expected around 5pm</p>
            <div className="flex gap-4 overflow-x-auto mt-6">
                {next24Hours?.map((hour) => (
                    <div
                        key={hour.dt}
                        className="min-w-20 p-3 text-center text-white">

                        <p className="text-sm">
                            {new Date(hour.dt * 1000).getHours()}:00
                        </p>

                        <div className="flex items-center justify-center mt-4 mb-4">
                            <WeatherIcon condition={hour.weather[0].main} size={30} />
                        </div>

                        <p className="text-lg font-bold">
                            {Math.round(hour.temp)}°
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default WeatherDaily