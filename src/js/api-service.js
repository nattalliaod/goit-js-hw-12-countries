import previewCountryTpl from '../templates/countryTemplate.hbs'
import listFindCountry from '../templates/listCountry.hbs'

import refs from './refs';

import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const BASE_URL = 'https://restcountries.com/v2/name';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
//  this.input = ''
  }
    fetchCountries() {
      const url = `${BASE_URL}/${this.searchQuery}`;
    
      return fetch(url)
        .then(response => response.json())
        .then(this.dataShow)
        .catch(this.errorInfo);
    
    }
      
    get query() {
    return this.searchQuery;
    }

    set query(newQuery) {
    this.searchQuery = newQuery;
  }

    dataShow(countries) {
     const { countriesMarkup } = refs;

    if (countries.length > 10) {
        notice({
            title: 'Notification',
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 3000,
        });
    }
    else if (countries.status === 404) {
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
    else if (this.query.length < 2 && this.query === " ")
        return;

    };

    errorInfo() {

    error({
        text: 'Invalid entered value',
        delay: 3000,
    });
    }
} 

 