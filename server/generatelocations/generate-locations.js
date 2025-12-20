import fetch from "node-fetch";
import fs from "fs";

const regions = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  // "Antarctica"
];

async function fetchRegionData(regionName, regionIndex) {
  const region = {
    region_name: regionName,
    region_id: `region_${regionIndex}`,
    region_countries: []
  };

  let countriesRes;
  try {
    countriesRes = await fetch(`https://restcountries.com/v3.1/region/${regionName}`);
  } catch (err) {
    console.warn(`Failed to fetch countries for ${regionName}`);
    return region;
  }

  const countriesData = await countriesRes.json();
  let countryCounter = 1;

  for (let country of countriesData) {
    const countryName = country.name.common;
    const countryObj = {
      country_name: countryName,
      country_id: `country_${regionIndex}_${countryCounter}`,
      country_states: []
    };

    let stateCounter = 1;
    try {
      const statesRes = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryName })
      });
      const statesData = await statesRes.json();
      const states = statesData.data?.states || []; // empty array if no states

      for (let state of states) {
        const stateObj = {
          state_name: state.name,
          state_id: `state_${regionIndex}_${countryCounter}_${stateCounter}`,
          state_cities: []
        };

        try {
          const citiesRes = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: countryName, state: state.name })
          });
          const citiesData = await citiesRes.json();
          const cities = citiesData.data || []; // empty array if no cities

          let cityCounter = 1;
          for (let city of cities) {
            stateObj.state_cities.push({
              city_name: city,
              city_id: `city_${regionIndex}_${countryCounter}_${stateCounter}_${cityCounter}`
            });
            cityCounter++;
          }
        } catch {
          console.warn(`Failed to fetch cities for ${state.name}, ${countryName}`);
        }

        countryObj.country_states.push(stateObj);
        stateCounter++;
      }
    } catch {
      console.warn(`Failed to fetch states for ${countryName}`);
    }

    region.region_countries.push(countryObj);
    countryCounter++;
  }

  return region;
}

async function getAllRegionsData() {
  const output = { region: [] };

  let regionIndex = 1;
  for (let regionName of regions) {
    console.log(`Fetching data for ${regionName}...`);
    const regionData = await fetchRegionData(regionName, regionIndex);
    output.region.push(regionData);
    regionIndex++;
  }

  fs.writeFileSync("world-data.json", JSON.stringify(output, null, 2), "utf-8");
  console.log("All regions data saved to world-data.json!");
}

getAllRegionsData();
