import React, { useEffect, useState } from "react";

export default function Weather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [coords, setCoords] = useState({ lat: 28.6139, lon: 77.2090 }); // fallback (New Delhi)

  // 1️⃣ Get location automatically
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("⚠️ Location access denied, using default (Delhi).");
        }
      );
    }
  }, []);

  // 2️⃣ Fetch Weatherbit current weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherbit.io/v2.0/current?lat=${coords.lat}&lon=${coords.lon}&key=39a396553fba4aebbba64779bb22948d`
        );
        const json = await res.json();
        if (json && json.data && json.data.length > 0) {
          setData(json.data[0]);
        } else {
          throw new Error("No data returned");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords]);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        🌾 Loading Ag-Weather Data...
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", color: "red", marginTop: 50 }}>
        {error}
      </div>
    );

  if (!data)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        No data available
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#f1f8e9",
        padding: 25,
        maxWidth: 800,
        margin: "40px auto",
        borderRadius: 12,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
        fontFamily: "Segoe UI, sans-serif",
        color: "#2e7d32",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#1b5e20" }}>🌤️ Current Ag-Weather</h2>
      <h3 style={{ textAlign: "center" }}>
        {data.city_name}, {data.country_code}
      </h3>
      <p style={{ textAlign: "center", color: "#388e3c" }}>
        Coordinates: {data.lat}, {data.lon}
      </p>

      <hr style={{ border: "1px solid #a5d6a7" }} />

      <div style={{ lineHeight: 1.6 }}>
        <h4>🌤️ Weather Conditions</h4>
        <p>Temperature: <strong>{data.temp} °C</strong></p>
        <p>Feels Like: <strong>{data.app_temp} °C</strong></p>
        <p>Relative Humidity: <strong>{data.rh}%</strong></p>
        <p>Wind Speed: <strong>{data.wind_spd} m/s</strong></p>
        <p>Wind Direction: <strong>{data.wind_cdir_full}</strong></p>
        <p>Pressure: <strong>{data.pres} mb</strong></p>
        <p>Sea Level Pressure: <strong>{data.slp} mb</strong></p>
        <p>Dew Point: <strong>{data.dewpt} °C</strong></p>
        <p>Cloud Coverage: <strong>{data.clouds}%</strong></p>
        <p>Visibility: <strong>{data.vis} km</strong></p>
        <p>Solar Radiation: <strong>{data.solar_rad} W/m²</strong></p>
        <p>Precipitation: <strong>{data.precip} mm/hr</strong></p>
        <p>UV Index: <strong>{data.uv}</strong></p>
        <p>Air Quality Index (AQI): <strong>{data.aqi}</strong></p>

        <h4>☀️ Solar & Irradiance Data</h4>
        <p>GHI (Global Horizontal): <strong>{data.ghi} W/m²</strong></p>
        <p>DNI (Direct Normal): <strong>{data.dni} W/m²</strong></p>
        <p>DHI (Diffuse Horizontal): <strong>{data.dhi} W/m²</strong></p>
        <p>Solar Elevation Angle: <strong>{data.elev_angle}°</strong></p>

        <h4>📆 Time & Location</h4>
        <p>Observation Time: <strong>{data.ob_time}</strong></p>
        <p>Sunrise: <strong>{data.sunrise}</strong></p>
        <p>Sunset: <strong>{data.sunset}</strong></p>
        <p>Timezone: <strong>{data.timezone}</strong></p>
        <p>Sources: <strong>{data.sources?.join(", ")}</strong></p>
      </div>

      {/* Advisory Section */}
      <div
        style={{
          marginTop: 25,
          padding: 15,
          backgroundColor: "#c8e6c9",
          borderRadius: 10,
        }}
      >
        <h4>💡 Quick Farming Advisory</h4>
        {data.precip > 2 ? (
          <p>🌧️ Heavy rainfall — avoid irrigation or pesticide spraying today.</p>
        ) : data.rh < 30 ? (
          <p>🔥 Low humidity — irrigate crops early in the morning or late evening.</p>
        ) : data.temp > 34 ? (
          <p>🌡️ High temperature — monitor for heat stress; shade sensitive crops.</p>
        ) : (
          <p>✅ Ideal conditions for routine field operations.</p>
        )}
      </div>
    </div>
  );
}
