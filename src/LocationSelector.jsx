import React, { useEffect, useState } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [displayText, setDisplayText] = useState("");

  // Fetch all countries on initial render
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((res) => res.json())
        .then((data) => {
          setStates(data);
          setCities([]); // clear cities
          setSelectedState("");
          setSelectedCity("");
          setDisplayText("");
        })
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(data);
          setSelectedCity("");
          setDisplayText("");
        })
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedState]);

  // Handle city selection
  useEffect(() => {
    if (selectedCity) {
      setDisplayText(
        `You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`
      );
    }
  }, [selectedCity]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Select Location</h2>

      {/* Country Dropdown */}
      <select
        data-testid="country"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        data-testid="state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        data-testid="city"
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

      {/* Display selected location */}
      {displayText && <p style={{ marginTop: "20px" }}>{displayText}</p>}
    </div>
  );
};

export default LocationSelector;
