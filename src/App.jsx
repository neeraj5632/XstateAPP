// App.jsx
import React, { useState, useEffect } from "react";

const MOCK_COUNTRIES = Array.from(
  { length: 283 },
  (_, i) => `Country ${i + 1}`
);
const MOCK_STATES = Array.from({ length: 35 }, (_, i) => `State ${i + 1}`);
const MOCK_CITIES = Array.from({ length: 11 }, (_, i) => `City ${i + 1}`);

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries (mocked)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Simulate network delay
        await new Promise((res) => setTimeout(res, 200));
        setCountries(MOCK_COUNTRIES);
      } catch (error) {
        setCountries([]);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states based on selected country (mocked)
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setSelectedState("");
      setCities([]);
      return;
    }

    const fetchStates = async () => {
      try {
        await new Promise((res) => setTimeout(res, 200));
        setStates(MOCK_STATES);
      } catch (error) {
        setStates([]);
      }
      setSelectedState("");
      setSelectedCity("");
    };
    fetchStates();
  }, [selectedCountry]);

  // Fetch cities based on selected state (mocked)
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity("");
      return;
    }

    const fetchCities = async () => {
      try {
        await new Promise((res) => setTimeout(res, 200));
        setCities(MOCK_CITIES);
      } catch (error) {
        setCities([]);
      }
      setSelectedCity("");
    };
    fetchCities();
  }, [selectedState]);

  return (
    <div className="App">
      <h2>Select Location</h2>

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

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

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
