import type { WeatherData } from "../types/weatherData"

interface Props {
    weather: WeatherData
}

const WeatherInfo = ({ weather }: Props) => {

    return (
        <div>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                    {weather.cityName}, {weather.country}
                </h2>
            </div>

            <div className="text-center">
                <div className="text-7xl font-bold text-white">
                    {Math.floor(weather.current.temp)}°
                </div>
                <p className="text-white/80 text-lg capitalize">
                    {weather.current.weather[0].main}
                </p>
                <div className="flex place-self-center text-white gap-4">
                    <div>
                        F:{Math.floor(weather.current.feels_like)}°
                    </div>
                    <div>
                        H: {weather.current.humidity}%
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherInfo