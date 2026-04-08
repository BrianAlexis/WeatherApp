const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

import { Sun } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
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

                <Marker position={[lat, lon]} icon={defaultIcon}>
                </Marker>
            </MapContainer>
        </div >
    );
};