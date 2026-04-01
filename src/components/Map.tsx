const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

import { Sun } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const Map = ({ lat, lon }: { lat: number; lon: number }) => {

    const position: [number, number] = [lat, lon];

    return (
        <div className="bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mt-4 overflow-x-hidden">
            <p className="flex gap-1 text-white mb-8"><Sun className="text-white" /> Temperature condition</p>
            <MapContainer
                center={position}
                zoom={8}
                className="w-full h-100 rounded-2xl overflow-hidden"
                key={`${lat}-${lon}`}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <TileLayer
                    opacity={0.8}
                    url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`
                    }
                />

                <Marker position={[lat, lon]}>
                    <Popup>Ubicación buscada</Popup>
                </Marker>
            </MapContainer>
        </ div >
    );
};