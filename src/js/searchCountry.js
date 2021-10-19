import debounce from 'lodash.debounce';

import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import previewCountryTpl from '../templates/countryTemplate.hbs'
import listFindCountry from '../templates/listCountry.hbs'

import refs from './refs';
import NewsApiService from './api-service';

const { search, countriesMarkup } = refs;

const newsApiService = new NewsApiService();

function searchInput(e) {
   clearContainer()
    
  newsApiService.query = e.target.value;
    if (newsApiService.query.length < 1 || newsApiService.query === ' ') {
        return  notice({
            text: 'enter your query',
            delay: 3000,
        }) ;
    }
  
  newsApiService.fetchCountries()
    .then(dataShow)
    .catch(errorInfo);
      


};

function dataShow(countries) {
     const { countriesMarkup } = refs;

    if (countries.length >= 10) {
        notice({
            title: 'Notification',
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 3000,
        });
    }
    // else if (countries.status === 404) {
    //    return notice({
    //         title: 'Notification',
    //         text: 'Not Found. Please enter a more specific query!',
    //     })
    // }
    else if (countries.length > 1) {
        countriesMarkup.innerHTML = listFindCountry(countries);
    }
    else {
        countriesMarkup.innerHTML = previewCountryTpl(...countries);
    }
  };

   function errorInfo() {
     error({
        text: 'Invalid entered value',
        delay: 3000,
    });
    }

function clearContainer() {
  countriesMarkup.innerHTML = '';
}

search.addEventListener('input', debounce(searchInput, 500));
