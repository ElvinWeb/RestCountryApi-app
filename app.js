const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector("#search-bar");
const searchBtn = document.querySelector(".search-icon");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    showCountries(data);
    allCountriesData = data;
  })
  .catch((err) => {
    console.log(err.message);
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => showCountries(data));
});

function showCountries(data) {
  countriesContainer.innerHTML = "";
  data.map((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    const cardHtml = `
        <div class="card-img" id="${country.name.common}">
          <img src="${country.flags.svg}" alt="${country.name.common}" />
        </div>
        <div class="card-content">
          <h2 class="card-title">${country.name.common}</h2>
          <p class="card-info"><span class="property">Population:</span> ${country.population.toLocaleString(
            "en-az"
          )}</p>
          <p class="card-info"><span class="property">Region:</span> ${
            country.region
          }</p>
          <p class="card-info"><span class="property">Capital:</span> ${
            country.capital
          }</p>
        </div>
      `;
    countryCard.innerHTML = cardHtml;
    countriesContainer.appendChild(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  let searchValue = e.target.value.trim();
  let msg = document.querySelector(".msg");
  const searchCountries = allCountriesData.filter((country) =>
    country.name.common
      .trim()
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase())
  );
  if (searchValue && searchValue.length > 1) {
    showCountries(searchCountries);
  } else if (!searchValue) {
    // countriesContainer.innerHTML = `<h1>Not Found</h1>`;
    msg.style.display = "block";
  } else {
    showCountries(allCountriesData);
  }
});
