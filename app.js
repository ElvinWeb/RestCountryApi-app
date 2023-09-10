const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector("#search-bar");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    showCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => showCountries(data));
});

function showCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    const cardHtml = `
        <img src="${country.flags.svg}" alt="${country.name.common}" />
        <div class="card-content">
          <h2 class="card-title">${country.name.common}</h2>
          <p class="card-info"><b>Population:</b> ${country.population.toLocaleString(
            "en-az"
          )}</p>
          <p class="card-info"><b>Region:</b> ${country.region}</p>
          <p class="card-info"><b>Capital:</b> ${country.capital}</p>
        </div>
      `;

    countryCard.innerHTML = cardHtml;
    countriesContainer.appendChild(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const searchCountries = allCountriesData.filter((country) =>
    country.name.common
      .trim()
      .toLowerCase()
      .includes(e.target.value.trim().toLowerCase())
  );
  showCountries(searchCountries);
});
