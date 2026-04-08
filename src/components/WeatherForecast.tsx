import { CalendarDays } from "lucide-react"
import type { WeatherData } from "../types/weatherData"
import { WeatherIcon } from "./WeatherIcon"

interface Props {
    weather: WeatherData
}

const WeatherForecast = ({ weather }: Props) => {
    return (
        <div className="bg-linear-to-br from-blue-700/70 to-blue-300/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl mt-4 overflow-x-hidden animate-fade-weather">
            <p className="flex gap-2 text-white/90 font-medium mb-6 font-secondary">
                <CalendarDays className="text-white/70" size={20} />
                10-day forecast
            </p>

            <div className="flex flex-col">
                {weather?.daily.map((day, index) => (
                    <div
                        className="grid grid-cols-3 py-4.5 items-center border-t border-white/10 last:pb-0"
                        key={day.dt}
                    >
                        <p className="text-white font-medium font-secondary">
                            {index === 0
                                ? "Today"
                                : new Date(day.dt * 1000).toLocaleDateString("en-US", {
                                    weekday: "long"
                                })}
                        </p>

                        <div className="flex justify-center">
                            <WeatherIcon condition={day.weather[0].main} size={32} />
                        </div>

                        <div className="flex justify-end gap-4 text-sm">
                            <span className="text-white/60 w-8 text-right">
                                {Math.floor(day.temp.min)}<sup>°c</sup>
                            </span>
                            <span className="text-white font-semibold w-8 text-right">
                                {Math.floor(day.temp.max)}<sup>°c</sup>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherForecast