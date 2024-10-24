import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';

const WeatherGet = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('New York');
    const [error, setError] = useState('');

    const getWeather = async (searchCity) => {
        try {
            const response = await axios.get(
                `http://api.weatherapi.com/v1/current.json?key=b28b72072a9b4d8998381421242210&q=${searchCity}&aqi=no`
            );
            setWeather(response.data);
            setError('');
        } catch (error) {
            setError('City not found. Please try again.');
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        getWeather(city);
    }, []);

    const handleSearch = () => {
        if (city.trim() !== '') {
            getWeather(city);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='weather-main'>
            <div className='search-container'>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter City:"
                    className='city-input'
                />
                <button onClick={handleSearch} className='search-button'>
                    Search
                </button>
            </div>

            {error && <p className='error-message'>{error}</p>}
            
            {weather && (
                <div className='weather-info'>
                    <h2 className='weather-title'>Weather in {weather.location.name}</h2>
                    <div className='weather-data'>
                        <p className='weather-temp'>{weather.current.temp_c}°C</p>
                        <p className='weather-cond'>{weather.current.condition.text}</p>
                        <img 
                            src={weather.current.condition.icon} 
                            alt={weather.current.condition.text}
                            className='weather-icon'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherGet;