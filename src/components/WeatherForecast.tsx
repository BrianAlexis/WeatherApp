import { CalendarDays } from "lucide-react"
import type { WeatherData } from "../types/weatherData"
import { WeatherIcon } from "./WeatherIcon"

interface Props {
    weather: WeatherData
}

const WeatherForecast = ({ weather }: Props) => {
    return (
        <div className="bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mt-4 overflow-x-hidden">
            <p className="flex gap-1 text-white mb-8"><CalendarDays className="text-white" /> 10-day forecast</p>
            {weather?.daily.map((day, index) => (
                <div className="flex justify-center gap-4 p-4 text-white items-center border-t border-slate-400" key={day.dt}>
                    <p>
                        {index === 0
                            ? "Today"
                            : new Date(day.dt * 1000).toLocaleDateString("en-US", {
                                weekday: "long",
                            })}
                    </p>
                    <p><WeatherIcon condition={day.weather[0].main} size={50} /></p>

                    <div className="flex gap-4">
                        <p>Min: {Math.floor(day.temp.min)}</p>
                        <p>Max: {Math.floor(day.temp.max)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default WeatherForecast