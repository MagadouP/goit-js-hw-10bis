import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');
const container = document.querySelector('.container');

function clearContainer() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function showCountryList(countries) {
    clearContainer();
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches. Please try a more specified name.');
        return;
    }
    countries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.classList.add('country-list-item');
        const flag = document.createElement('img');
        flag.src = country.flags.svg;
        flag.alt = `${country.name.common} flag`;
        flag.classList.add('country-flag');

        const name = document.createElement('h1');
        name.classList.add('country-name');
        name.textContent = country.name.common;
        listItem.appendChild(flag);
        listItem.appendChild(name);
        countryList.appendChild(listItem);
    });
}

const showCountryInfo = function showCountryInfo(country) {
    clearContainer();
    const card = document.createElement('div');
    card.classList.add('country-info-card');

    const flag = document.createElement('img');
    flag.src = country.flags.svg;
    flag.alt = `${country.name.common} flag`;
    flag.classList.add('country-flag');
    card.appendChild(flag);

    const name = document.createElement('span');
    name.classList.add(`${'country-name'}`);
    name.textContent = country.name.common;
    card.appendChild(name);

    const details = document.createElement('ul');
    details.classList.add('country-details');

    const capital = document.createElement('li');
    capital.innerHTML = `<span>Capital: </span>${country.capital}`;
    details.appendChild(capital)

    const population = document.createElement('li');
    capital.innerHTML = `<span>Population: </span>${country.population}`;
    details.appendChild(population);

    const languages = document.createElement('li');
    capital.innerHTML = `<span>Languages: </span>${country.languages}`;
    details.appendChild(languages);

    card.appendChild(details);

    countryInfo.appendChild(card);
}

searchBox.addEventListener("input", debounce(async () => {
const name = searchBox.ariaValueMax.trim();
if (!name) {
}
try {
    const countries = await fetchCountries(name);
    if (countries.length === 1) {
        showCountryInfo(countries[0]);
        countryList.textContent = '';
    } else if (countries.length > 1) {
        showCountryList(countries);
        countryInfo.textContent = '';
    }
} catch (error) {
    clearContainer();
    Notiflix.Notify.failure('Oops, there is no country with that name');
}
}, 300));


