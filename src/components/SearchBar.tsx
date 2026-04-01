import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { searchCities } from "../services/weatherService";

interface Props {
    city: string;
    setCity: (value: string) => void;
    onSelectCity: (lat: number, lon: number, name: string) => void;
}

const SearchBar = ({ city, setCity, onSelectCity }: Props) => {

    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (city.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const results = await searchCities(city);
                setSuggestions(results);
                setShowDropdown(true);
            } catch (error) {
                console.log(error);
            }
        }, 200);

        return () => clearTimeout(delayDebounce);
    }, [city]);

    return (
        <div className="w-full max-w-md relative">

            <div className="relative group">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Buscar ciudad..."
                    className="w-full px-6 py-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none"
                />

                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
            </div>

            {showDropdown && suggestions.length > 0 && (
                <div className="absolute w-full mt-2 bg-slate-800 border border-white/20 rounded-2xl overflow-hidden z-50">
                    {suggestions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setCity(item.name);
                                setShowDropdown(false);
                                onSelectCity(item.lat, item.lon, item.name);
                            }}
                            className="p-3 text-white hover:bg-white/10 cursor-pointer"
                        >
                            {item.name}
                            {item.state ? `, ${item.state}` : ""}, {item.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;