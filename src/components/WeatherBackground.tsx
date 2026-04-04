import React, { useLayoutEffect, useRef } from "react";
import type { WeatherData } from "../types/weatherData";

export const WeatherBackground = React.memo(({ weather }: { weather: WeatherData | null }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const mainWeather = weather?.current.weather[0].main.toLowerCase();

    const getAssets = () => {
        if (["rain", "drizzle", "thunderstorm"].some(c => mainWeather?.includes(c))) {
            return { video: "/videos/rain.mp4", audio: "/sounds/rain_sound.mp3" };
        }
        if (mainWeather?.includes("snow")) {
            return { video: "/videos/snow.mp4", audio: "/sounds/snow_sound.mp3" };
        }
        if (mainWeather?.includes("clear")) {
            return { video: "/videos/clear.mp4", audio: "/sounds/clear_sound.mp3" };
        }
        if (mainWeather?.includes("clouds")) {
            return { video: "/videos/clouds.mp4", audio: "/sounds/clouds_sound.mp3" };
        }
        return { video: "/videos/default.mp4", audio: null };
    };

    const { video, audio } = getAssets();

    useLayoutEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.05;
        }
    }, [audio]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <video
                key={video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={video} type={video.endsWith('.webm') ? "video/webm" : "video/mp4"} />
            </video>

            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-1" />

            {audio && (
                <audio
                    key={audio}
                    ref={audioRef}
                    src={audio}
                    autoPlay
                    loop
                />
            )}
        </div>
    );
});