const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const WEATHER_URL = 'https://api.openweathermap.org/data/3.0';

export async function getCityCoordinates(city: string) {
    const response = await fetch(
        `${GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error('Error, ciudad no encontrada');

    const data = await response.json();

    if (!data || data.length === 0) throw new Error('No escribiste nada');

    return data[0];
}

export async function getCurrentWeather(lat: number, lon: number) {
    const response = await fetch(
        `${WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    );

    if (!response.ok) throw new Error('Error de respuesta');

    const data = await response.json();

    console.log({ data })

    return data;
}

export async function searchCities(city: string) {
    const response = await fetch(
        `${GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=3&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error("Error buscando ciudades");

    return await response.json();
}

export async function getWeatherByCity(city: string) {
    const coords = await getCityCoordinates(city)

    const weather = await getCurrentWeather(coords.lat, coords.lon)

    console.log({ coords })

    return {
        cityName: coords.name,
        country: coords.country,
        lat: coords.lat,
        lon: coords.lon,
        ...weather
    }
}