import { useState } from "react";
import axios from "axios";

export const useLocation = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryNames = response.data.map((country) => country.name.common);
      const uniqueCountryNames = [...new Set(countryNames)];
      setCountries(uniqueCountryNames);
    } catch (error) {
      console.error(error);
    }
  };

  const getCities = async (value) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          country: value.toLowerCase().replace(/\s/g, ""),
        }
      );
      setCities(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = (value) => {
    if (value) {
      axios
        .get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
        )
        .then((response) => {
          setLocationOptions(
            response.data.map((place) => ({ value: place.display_name }))
          );
        });
    } else {
      setLocationOptions([]);
    }
  };

  return {
    getLocation,
    locationOptions,
    getCountries,
    getCities,
    countries,
    cities,
  };
};
