# Weather App

A React weather dashboard that fetches live data from OpenWeatherMap. It combines search with suggestions, detailed forecasts, an interactive map, and an immersive background that reacts to the current conditions.

## Features

### Search and discovery

- **City search with live suggestions** — As you type (after 2+ characters), the app queries the OpenWeatherMap Geocoding API and shows up to three matching cities (name, optional state, country).
- **Keyboard-friendly** — Navigate suggestions with arrow keys, confirm with Enter, or dismiss with Escape. Mouse selection is supported as well.
- **Light feedback sounds** — Optional typing and success sounds when interacting with the search bar (`useSound` hook).

### Current conditions

- **Hero summary** — City name, timezone label, current temperature, condition label, “feels like” temperature, and humidity.

### Forecasts

- **Today’s narrative** — Uses OpenWeather’s daily summary for the first day.
- **Hourly strip** — Next several hours with time, custom weather icons, and temperature in a horizontally scrollable card.
- **10-day outlook** — Each day shows weekday (or “Today”), min/max temperatures, and condition icons.

### Map

- **Leaflet map** centered on the selected location with:
  - OpenStreetMap base tiles
  - OpenWeatherMap **temperature overlay** (`temp_new`) for spatial context
  - A marker at the searched coordinates

### Atmosphere

- **Dynamic full-screen background** — Looped video switches by condition (rain, snow, clear, clouds, default). Ambient audio loops at low volume when a matching sound exists (rain, snow, clear, clouds).

### UX

- **Loading state** — Spinner while weather data is fetched.
- **Error handling** — Friendly message when a city cannot be resolved or the request fails.
- **Animations** — Fade-in for the main layout and weather panels.

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 19 (RC), TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Map | Leaflet, react-leaflet |
| Icons | lucide-react |
| Compiler | React Compiler (Babel plugin) |
| Lint | ESLint 9 + typescript-eslint |

## API and environment

Data comes from **OpenWeatherMap**:

- **Geocoding API** — Resolve city names to coordinates and power search suggestions.
- **One Call API 3.0** — `onecall` endpoint for current, hourly, daily, minutely, alerts, etc. (metric units, English descriptions).

Create a `.env` file in the project root:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

The same key is used for the weather JSON API and the temperature map tiles. Ensure your OpenWeather account has access to **One Call API 3.0** if you use that endpoint.

## Project structure

```
src/
├── App.tsx                 # Layout, state, orchestration
├── main.tsx
├── components/
│   ├── SearchBar.tsx       # Debounced search + dropdown + keyboard
│   ├── WeatherInfo.tsx     # Current conditions header
│   ├── WeatherDaily.tsx    # Summary + hourly strip
│   ├── WeatherForecast.tsx # 10-day list
│   ├── Map.tsx             # Leaflet + OSM + temp layer
│   ├── WeatherBackground.tsx
│   ├── WeatherIcon.tsx     # Condition → lucide icons
│   ├── Loader.tsx
│   ├── ErrorMessage.tsx
│   └── Footer.tsx
├── hooks/
│   └── useSound.tsx        # Short UI sounds
├── services/
│   └── weatherService.ts   # Geocoding, search, one-call fetch
└── types/
    └── weatherData.ts      # OpenWeather response shapes
```

Static assets referenced in code (e.g. `/videos/*.mp4`, `/sounds/*.mp3`) should live under `public/` so Vite serves them at the root URL.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Author

Footer credits: **Brian** — [LinkedIn](https://www.linkedin.com/in/brian-alexis-acu%C3%B1a/).
