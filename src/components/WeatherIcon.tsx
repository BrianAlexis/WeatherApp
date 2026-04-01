import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle, CloudLightning, Wind } from 'lucide-react';

interface WeatherIconProps {
    condition: string;
    size?: number;
    className?: string;
}

export function WeatherIcon({ condition, size = 64, className = '' }: WeatherIconProps) {
    const iconProps = { size, className: `${className} drop-shadow-lg` };

    switch (condition.toLowerCase()) {
        case 'clear':
            return <Sun {...iconProps} className={`${iconProps.className} text-yellow-300`} />;
        case 'clouds':
            return <Cloud {...iconProps} className={`${iconProps.className} text-gray-200`} />;
        case 'rain':
            return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-300`} />;
        case 'drizzle':
            return <CloudDrizzle {...iconProps} className={`${iconProps.className} text-blue-200`} />;
        case 'thunderstorm':
            return <CloudLightning {...iconProps} className={`${iconProps.className} text-purple-300`} />;
        case 'snow':
            return <CloudSnow {...iconProps} className={`${iconProps.className} text-blue-100`} />;
        default:
            return <Wind {...iconProps} className={`${iconProps.className} text-gray-300`} />;
    }
}
