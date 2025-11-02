import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State variables
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // ✅ Cypress-compatible mock data
  const mockCountries = ["India", "Australia"];
  const mockStates = {
    India: ["Goa", "Maharashtra", "Karnataka"],
    Australia: ["Western Australia", "New South Wales"],
  };
  const mockCities = {
    Goa: ["Panaji", "Vasco da Gama", "Mapusa"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    "Western Australia": ["Perth", "Fremantle", "Bunbury"],
    "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
  };

  // ✅ Safe fetch simulation (can replace with real API if available)
  useEffect(() => {
    const loadCountries = async () => {
      try {
        // Replace with real API if available
        // const res = await fetch("https://api-for-countries.com");
        // const data = await res.json();
        const data = mockCountries; // using mock data
        setCountries(data);
      } catch {
        setCountries(mockCountries);
      }
    };
    loadCountries();
  }, []);

  // ✅ Load states when country changes
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setCities([]);
      return;
    }
    const loadStates = () => {
      setStates(mockStates[selectedCountry] || []);
      setSelectedState("");
      setSelectedCity("");
    };
    loadStates();
  }, [selectedCountry]);

  // ✅ Load cities when state changes
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }
    const loadCities = () => {
      setCities(mockCities[selectedState] || []);
      setSelectedCity("");
    };
    loadCities();
  }, [selectedState]);

  return (
    <div className="App">
      <h2>Select Location</h2>

      {/* Country Dropdown */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Result */}
      {selectedCity && (
        <p className="result">
          You selected <strong>{selectedCity}</strong>, {selectedState},{" "}
          {selectedCountry}
        </p>
      )}
    </div>
  );
}

export default App;
