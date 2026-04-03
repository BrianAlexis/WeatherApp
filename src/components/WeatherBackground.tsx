import React from "react";
import type { WeatherData } from "../types/weatherData";

export const WeatherBackground = React.memo(({ weather }: { weather: WeatherData | null }) => {
    if (!weather) return <div className="" />

    const mainWeather = weather.current.weather[0].main.toLocaleLowerCase();

    const getVideoSrc = () => {
        if (mainWeather.includes("rain") || mainWeather.includes("drizzle")) return "/videos/lloviendo.webm";
        if (mainWeather.includes("snow")) return "/videos/nevando.webm";
        if (mainWeather.includes("clear")) return "/videos/soleado.mp4";
        if (mainWeather.includes("cloud")) return "/videos/nublado.mp4";
    };

    const videoSrc = getVideoSrc();

    return (
        <video
            key={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        >
            <source src={videoSrc} type="video/webm" />
        </video>
    );
});