import { Search } from "lucide-react"

interface Props {
    city: string;
    setCity: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const SearchBar = ({ city, setCity, handleSubmit }: Props) => {
    return (
        <form className="w-full max-w-md z-50 self-center mb-10" onSubmit={handleSubmit}>
            <div className="relative group">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Buscar ciudad..."
                    className="w-full px-6 py-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 group-hover:bg-white/15"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                    <Search size={20} className="text-white" />
                </button>
            </div>
        </form>
    )
}
export default SearchBar