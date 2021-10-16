import debounce from 'lodash.debounce';


import refs from './refs';
import searchCountry from './api-service';

import previewCountryTpl from '../templates/countryTemplate.hbs'
import listFindCountry from '../templates/listCountry.hbs'


import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const { search, countriesMarkup } = refs

const searchInput = e => {
    const searchQuery = e.target.value;
   
    countriesMarkup.innerHTML = '';

    searchCountry.fetchCountries(searchQuery)
            .then(dataShow)
            .catch(errorInfo);
};

function dataShow(countries) {
 
    if (countries.length > 10) {
        notice({
            title: 'Notification',
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 3000,
        });
    }
    else if (countries.status === 404) {
        console.log(countries.status);
        notice({
            title: 'Notification',
            text: 'Not Found. Please enter a more specific query!',
        })
    }
    else if (countries.length > 1 && countries.length < 10) {
        countriesMarkup.innerHTML = listFindCountry(countries);
    }
    else if (countries.length === 1) {
        countriesMarkup.innerHTML = previewCountryTpl(...countries);
    }
    else if (searchQuery.length < 2 && searchQuery === " ")
        return;

};

function errorInfo  () {

        error({
            text: 'Invalid entered value',
        });
    }
search.addEventListener('input', debounce(searchInput, 500));
