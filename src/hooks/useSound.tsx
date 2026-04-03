export const useSound = (url: string) => {
    const audio = new Audio(url);

    const play = () => {
        audio.currentTime = 0;
        audio.play().catch(() => { });
        audio.volume = 0.1;
    };

    return play;
};