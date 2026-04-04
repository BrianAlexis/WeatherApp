import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { searchCities } from "../services/weatherService";
import { useSound } from "../hooks/useSound";

interface Props {
    city: string;
    setCity: (value: string) => void;
    onSelectCity: (lat: number, lon: number, name: string) => void;
}

interface City {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

const SearchBar = ({ city, setCity, onSelectCity }: Props) => {

    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const isSelectingRef = useRef(false);

    const keyboardTypingSound = useSound('/sounds/keyboard_typing.mp3');
    const searchCitySound = useSound('/sounds/success.mp3');

    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSelectingRef.current) {
            isSelectingRef.current = false;
            searchCitySound()
            return;
        }

        const delayDebounce = setTimeout(async () => {
            if (city.length < 2) {
                setSuggestions([]);
                setShowDropdown(false);
                return;
            }

            try {
                const results = await searchCities(city);
                setSuggestions(results);
                if (document.activeElement?.tagName === "INPUT") setShowDropdown(results.length > 0);
            } catch (error) {
                console.log(error);
            }
        }, 200);

        return () => clearTimeout(delayDebounce);
    }, [city, searchCitySound]);

    return (
        <div className="w-full max-w-md relative mb-8">
            <div className="relative group">
                <input
                    type="text"
                    value={city}
                    ref={inputRef}
                    placeholder="Search a city..."
                    onChange={(e) => {
                        setCity(e.target.value)
                        setHighlightedIndex(-1);
                        keyboardTypingSound()
                    }}
                    onBlur={() => setShowDropdown(false)}
                    onKeyDown={(e) => {
                        if (!showDropdown) return;

                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setHighlightedIndex((prev) =>
                                prev < suggestions.length - 1 ? prev + 1 : 0
                            );
                        }

                        if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setHighlightedIndex((prev) =>
                                prev > 0 ? prev - 1 : suggestions.length - 1
                            );
                        }

                        if (e.key === "Enter") {
                            e.preventDefault();

                            if (highlightedIndex >= 0) {
                                const selected = suggestions[highlightedIndex];

                                isSelectingRef.current = true;
                                setCity(selected.name);
                                setShowDropdown(false);
                                onSelectCity(selected.lat, selected.lon, selected.name);
                            }
                        }

                        if (e.key === "Escape") {
                            setShowDropdown(false);
                        }
                    }}
                    className="w-full px-6 py-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none"
                />

                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
            </div>

            {showDropdown && suggestions.length > 0 && (
                <div className="absolute w-full mt-2 bg-slate-800 border border-white/20 rounded-2xl overflow-hidden z-50">
                    {suggestions.map((item, index) => (
                        <div
                            key={`${item.name}-${item.lat}-${item.lon}`}
                            onMouseDown={(e) => {
                                e.preventDefault()
                                isSelectingRef.current = true;
                                setCity(item.name);
                                setShowDropdown(false);
                                onSelectCity(item.lat, item.lon, item.name);
                                inputRef.current?.blur();
                            }}
                            className={`p-3 text-white cursor-pointer ${index === highlightedIndex
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                                }`}
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