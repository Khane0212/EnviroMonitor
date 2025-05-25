import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_KEY = "d8ea565ecb9457d897ca0e298c308fd5";

const getAirQuality = (pm25) => {
  if(pm25 <= 12) return { level: "Tốt", color: "green", icon: "👍" };
  if(pm25 <= 35) return { level: "Trung bình", color: "orange", icon: "⚠️" };
  if(pm25 <= 55) return { level: "Kém", color: "#ff8c00", icon: "😷" };
  return { level: "Nguy hại", color: "red", icon: "🚨" };
};

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setPosition({ lat, lng });
      onSelect(lat, lng);
    }
  });

  return position ? (
    <Marker position={position}>
      <Popup>Vị trí đã chọn</Popup>
    </Marker>
  ) : null;
}

export default function MapView() {
  const [weatherData, setWeatherData] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 21.0285, lng: 105.8542 });

  const fetchWeather = async (lat, lon) => {
    try {
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const weather = await weatherRes.json();

      const airRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const air = await airRes.json();

      setWeatherData({
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        pressure: weather.main.pressure,
        clouds: weather.clouds.all,
        wind: weather.wind.speed,
        status: weather.weather[0].main,
        icon: weather.weather[0].icon,
        pm25: air.list[0].components.pm2_5,
        time: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
      });
    } catch (err) {
      console.error("Lỗi gọi API:", err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setMapCenter(coords);
          fetchWeather(coords.lat, coords.lng);
        },
        () => console.warn("Không lấy được vị trí.")
      );
    }
  }, []);

  const quality = weatherData ? getAirQuality(weatherData.pm25) : null;

  return (
    <div>
      <h4 className="text-white mb-3">🗺️ Bản đồ môi trường</h4>
      <MapContainer center={mapCenter} zoom={10} style={{ height: "500px", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution="© OpenStreetMap contributors"
/>

        <LocationMarker onSelect={fetchWeather} />
      </MapContainer>

      {weatherData && (
        <div
          className="card mt-4"
          style={{
            backgroundColor: '#222',
            color: '#eee',
            border: '1px solid #444',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        >
          <div className="card-body">
            <h5 className="card-title" style={{ color: '#fff' }}>📍 Dữ liệu tại vị trí</h5>
            {weatherData.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt="icon"
                style={{ width: 60 }}
              />
            )}
            <p>🌡️ Nhiệt độ: {weatherData.temp}°C</p>
            <p>💧 Độ ẩm: {weatherData.humidity}%</p>
            <p>🔽 Áp suất: {weatherData.pressure} hPa</p>
            <p>🌥️ Mây: {weatherData.clouds}%</p>
            <p>🌬️ Gió: {weatherData.wind} m/s</p>
            <p>
              🌫️ PM2.5: {weatherData.pm25} µg/m³{' '}
              <span style={{ color: quality.color, fontWeight: 'bold', marginLeft: 8 }}>
                {quality.icon} {quality.level}
              </span>
            </p>
            <p>⛅ Thời tiết: {weatherData.status}</p>
            <p>⏰ Thời gian: {weatherData.time}</p>
          </div>
        </div>
      )}
    </div>
  );
}
