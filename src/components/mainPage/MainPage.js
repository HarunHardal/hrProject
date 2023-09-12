import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/slice/slice";
import './mainpage.css'

const MainPage = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);

  const [filterCriteria, setFilterCriteria] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    const [searchCriteria, groupCriteria] = filterCriteria.split(" group:");

    let filtered = countries;

    if (searchCriteria) {
      const searchTerm = searchCriteria.replace("search:", "");
      const searchTerms = searchTerm.split("");
      filtered = countries.filter((f) => {
        const countryName = f.name.toLowerCase();
        return searchTerms.every((e) => countryName.includes(e.toLowerCase()));
      });

      console.log(searchTerms);
    }

    if (groupCriteria) {
      const groupValue = groupCriteria.trim();
      console.log(groupValue);
      if (!isNaN(groupValue)) {
        const sizeValue = parseInt(groupValue, 10);
        filtered = filtered.filter((e) => e.name.length === sizeValue);
        console.log(sizeValue);
      }
    }
    setFilteredCountries(filtered);
  }, [filterCriteria, countries]);

  const handleCountry = (e) => {
    if (selectedCountries.includes(e)) {
      const newSelectedCountries = selectedCountries.filter((c) => c !== e);
      setSelectedCountries(newSelectedCountries);
      localStorage.setItem("selected", JSON.stringify(newSelectedCountries));
    } else {
      const newSelectedCountries = [...selectedCountries, e];
      setSelectedCountries(newSelectedCountries);
      localStorage.setItem("selected", JSON.stringify(newSelectedCountries));
    }
  };

  useEffect(() => {
    const countriesFromLocalS = JSON.parse(localStorage.getItem("selected"));
    if (countriesFromLocalS) {
      setSelectedCountries(countriesFromLocalS);
    }
  }, []);

  useEffect(() => {
    const filteredCountriesLength = filteredCountries.length;
  
    if (filteredCountriesLength >= 10) {
      const selectedItem = filteredCountries[9];
      setSelectedCountries([selectedItem]);
      localStorage.setItem("selected", JSON.stringify([selectedItem.name]));
    } else if (filteredCountriesLength > 0) {
      const lastItem = filteredCountries[filteredCountriesLength - 1];
      setSelectedCountries([lastItem]);
      localStorage.setItem("selected", JSON.stringify([lastItem.name]));
    }
  }, []);

  return (
    <div className="mainpage-container">
      <h1>countries</h1>
      <input
        type="text"
        placeholder="Search and group (e.g., 'search:tt group:size')"
        value={filterCriteria}
        onChange={(e) => setFilterCriteria(e.target.value)}
      />
      <ul>
        {filteredCountries.map((country) => (
          <li
            className={selectedCountries.includes(country.name) ? "selected" : null}
            onClick={() => handleCountry(country.name)}
            key={country.code}
          >
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
