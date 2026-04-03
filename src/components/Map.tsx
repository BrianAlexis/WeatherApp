const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

import { Sun } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const Map = ({ lat, lon }: { lat: number; lon: number }) => {

    const position: [number, number] = [lat, lon];

    return (
        <div className="bg-linear-to-br from-blue-500/30 to-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl mt-4 overflow-x-hidden">
            <p className="flex gap-2 text-white mb-4 border-b border-white/10 pb-6 font-secondary"><Sun className="text-white" /> Temperature condition</p>
            <MapContainer
                center={position}
                zoom={8}
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
                    <Popup>Ubicación buscada</Popup>
                </Marker>
            </MapContainer>
        </ div >
    );
};