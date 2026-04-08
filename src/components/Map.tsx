const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

import { Sun } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import L from "leaflet";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
});

export const Map = ({ lat, lon }: { lat: number; lon: number }) => {

    const position: [number, number] = [lat, lon];

    return (
        <div className="bg-linear-to-br from-blue-700/70 to-blue-300/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl mt-4 overflow-x-hidden animate-fade-weather">
            <p className="flex gap-2 text-white mb-4 border-b border-white/10 pb-6 font-secondary"><Sun className="text-white" /> Temperature condition</p>
            <MapContainer
                center={position}
                zoom={9}
                className="w-full h-135 rounded-2xl overflow-hidden"
                key={`${lat}-${lon}`}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <TileLayer
                    url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`
                    }
                />

                <Marker position={[lat, lon]}>
                </Marker>
            </MapContainer>
        </div >
    );
};