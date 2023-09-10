const countryURL = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".flag img");
const countryName = document.querySelector(".detail-content h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currencies = document.querySelector(".currency");
const language = document.querySelector(".language");
const borderCountries = document.querySelector(".border-countries");
fetch(`https://restcountries.com/v3.1/name/${countryURL}?fullText=true`)
  .then((res) => res.json())
  .then((country) => {
    console.log(country);
    flagImg.src = country[0].flags.svg;
    countryName.textContent = country[0].name.common;
    population.textContent = country[0].population.toLocaleString("en-az");
    region.textContent = country[0].region;
    domain.textContent = country[0].tld;

    if (country[0].capital) {
      capital.textContent = country[0].capital?.[0];
    }

    if (country[0].subregion) {
      subRegion.textContent = country[0].subregion;
    }
    if (country[0].currencies) {
      currencies.textContent = Object.values(country[0].currencies).map(
        (currency) => currency.name
      );
    }
    if (country[0].name.nativeName) {
      nativeName.textContent = Object.values(
        country[0].name.nativeName
      )[0].common;
    } else {
      nativeName.textContent = country[0].name.common;
    }

    if (country[0].languages) {
      language.textContent = Object.values(country[0].languages).join(" , ");
    }

    if (country[0].borders) {
      country[0].borders.map((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then((borderCountry) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.textContent = borderCountry[0].name.common;
            borderCountryTag.href = `country.html?name=${borderCountry[0].name.common}`;
            borderCountries.appendChild(borderCountryTag);
          })
          .catch((error) => {
            const errorP = document.createElement("p");
            errorP.classList.add("not-found");
            console.log(error.message);
            errorP.textContent = "borderCountry is not defined⛔";
            borderCountries.append(errorP);
          });
      });
    } else {
      const errorP = document.createElement("p");
      errorP.classList.add("not-found");
      errorP.textContent = "This country has no border countries⛔";
      borderCountries.append(errorP);
    }
  });
