import { useRef } from "react";

// Dentro de tu hook useSound (o cámbialo si puedes)
export const useSound = (url: string) => {
    const audioRef = useRef(new Audio(url));

    return () => {
        const audio = audioRef.current;
        audio.currentTime = 0;
        audio.play().catch(() => { });
        audio.volume = 0.1;
        audio.preload = "auto"
    };
};