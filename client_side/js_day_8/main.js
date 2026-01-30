let countryCard = document.querySelector(".country_card");
const getCountryDetails = async function (name) {
  try {
    let response = await fetch("https://restcountries.com/v2/name/" + name);

    if (response.status !== 200) {
      throw new Error(`country name is not found (status ${response.status})`);
    }

    let responseData = await response.json();
    if (responseData) {
      let countryData = responseData[0];
      let nameOfNeighbour = countryData.borders[1];
      let neighbourResponseData = null;
      if (nameOfNeighbour) {
        let neighbourResponse = await fetch(
          "https://restcountries.com/v2/alpha/" + nameOfNeighbour
        );
        if (neighbourResponse.status === 200) {
          neighbourResponseData = await neighbourResponse.json();
        } else {
          throw new Error("Neighbor not found");
        }
      }

      let neighbourCountry = null;
      if (neighbourResponseData) {
        neighbourCountry = new Country(
          neighbourResponseData.name,
          neighbourResponseData.region,
          neighbourResponseData.population,
          neighbourResponseData.currencies[0].name,
          neighbourResponseData.flag,
          neighbourResponseData.languages[0].name,
          null
        );
      }

      let country = new Country(
        countryData.name,
        countryData.region,
        countryData.population,
        countryData.currencies[0].name,
        countryData.flag,
        countryData.languages[0].name,
        neighbourCountry
      );
      console.log(country);

      countryToCard(country);
      neighbourCountryToCard(neighbourCountry);
    }
  } catch (error) {
    console.log("getCountryDetails error:", error);
    throw error;
  }
};
getCountryDetails(prompt("enter the name of the country").toLowerCase());
const formatPopulation = (population) => {
  if (population > 1000000000) {
    return (population / 1000000000).toFixed(1) + "B";
  }
  if (population > 1000000) {
    return (population / 1000000).toFixed(1) + "M";
  }
  if (population > 1000) {
    return (population / 1000).toFixed(1) + "K";
  }
};

const countryToCard = (country) => {
  let container = document.querySelector(".main_country .country_card");
  let flag = container.querySelector("img.country_flag");
  flag.src = country.photo;
  let countryName = container.querySelector("p.country_name");
  countryName.innerText = country.name || "";
  let countryContinent = container.querySelector("p.country_continent");
  countryContinent.innerText = country.continent || "";
  let infoPs = container.querySelectorAll("div.country_general_info p");

  infoPs[0].innerText = formatPopulation(country.population) + " People";
  infoPs[1].innerText = country.language || "";
  infoPs[2].innerText = country.currency || "";
};

const neighbourCountryToCard = (country) => {
  let container = document.querySelector(".neighbor_country .country_card");
  let flag = container.querySelector("img.country_flag");
  if (flag) flag.src = country.photo || flag.src;
  let countryName = container.querySelector("p.country_name");
  if (countryName) countryName.innerText = country.name || "";
  let countryContinent = container.querySelector("p.country_continent");
  if (countryContinent) countryContinent.innerText = country.continent || "";
  let infoPs = container.querySelectorAll("div.country_general_info p");
  infoPs[0].innerText = formatPopulation(country.population) + " People";
  infoPs[1].innerText = country.language || "";
  infoPs[2].innerText = country.currency || "";
};
