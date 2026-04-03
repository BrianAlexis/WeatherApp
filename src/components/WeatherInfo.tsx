import type { WeatherData } from "../types/weatherData"

interface Props {
    weather: WeatherData
}

const WeatherInfo = ({ weather }: Props) => {

    const formattedTimezone = weather.timezone
        ?.replaceAll("/", " / ")
        .replaceAll("_", " ");

    return (
        <div className="flex flex-col items-center justify-center font-sans">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                    {weather.cityName}, {formattedTimezone}
                </h2>
            </div>

            <div className="text-center">
                <div className="text-7xl font-bold text-white">
                    {Math.floor(weather.current.temp)}°
                </div>
                <div>
                    <p className="text-white/80 text-lg capitalize">
                        {weather.current.weather[0].main}
                    </p>
                </div>

                <div className="flex text-white gap-4">
                    <div>
                        <p className="text-white/80 text-lg capitalize">
                            <span className="font-secondary text-sm">F:</span> {Math.floor(weather.current.feels_like)}°
                        </p>
                    </div>
                    <div>
                        <p className="text-white/80 text-lg capitalize">
                            <span className="font-secondary text-sm">H:</span> {weather.current.humidity}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherInfo