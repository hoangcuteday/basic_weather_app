import { useState, useEffect } from 'react';
interface WeatherData {
	name: string;
	main: {
		temp: number;
	};
	weather: {
		description: string;
	}[];
}

interface ForecastItem {
	dt: number;
	main: {
		temp: number;
	};
	weather: {
		description: string;
	}[];
}

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function App() {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [city, setCity] = useState('Hanoi');
	const [forecast, setForecast] = useState<ForecastItem[]>([]);

	const fetchWeather = async () => {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
			);
			const data = await res.json();
			setWeather(data);

			const forecastRes = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
			);
			const forecastData = await forecastRes.json();
			setForecast(forecastData.list.slice(0, 5));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchWeather();
	}, []);

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-2 sm:p-4'>
			<h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-700 text-center'>
				Weather App
			</h1>
			<div className='flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6 w-full max-w-md'>
				<input
					value={city}
					onChange={(e) => setCity(e.target.value)}
					placeholder='Enter city'
					className='px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1'
				/>
				<button
					onClick={fetchWeather}
					className='px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-full sm:w-auto'>
					Search
				</button>
			</div>

			{weather && weather.main ? (
				<div className='bg-white bg-opacity-80 rounded-lg shadow p-4 sm:p-6 w-full max-w-md mb-6 sm:mb-8'>
					<h2 className='text-lg sm:text-xl font-semibold mb-2 text-blue-800 text-center'>
						{weather.name}
					</h2>
					<p className='text-xl sm:text-2xl text-center'>🌡 {weather.main.temp}°C</p>
					<p className='capitalize text-center'>☁ {weather.weather[0].description}</p>
				</div>
			) : (
				<p className='text-gray-500'>Loading...</p>
			)}

			{forecast.length > 0 && (
				<div className='bg-white bg-opacity-80 rounded-lg shadow p-4 sm:p-6 w-full max-w-md'>
					<h3 className='text-base sm:text-lg font-bold mb-2 sm:mb-4 text-blue-700 text-center'>
						Short-term Forecast
					</h3>
					<ul className='space-y-2'>
						{forecast.map((item, idx) => (
							<li
								key={idx}
								className='flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base'>
								<span className='font-medium'>{new Date(item.dt * 1000).toLocaleString()}</span>
								<span>🌡 {item.main.temp}°C</span>
								<span className='capitalize'>{item.weather[0].description}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
