import debounce from 'lodash.debounce';

import { notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import refs from './refs';
import NewsApiService from './api-service';

const { search, countriesMarkup } = refs;

const newsApiService = new NewsApiService();

function searchInput(e) {
    
    newsApiService.query = e.target.value;
   
    if (newsApiService.query === ' ') {
        return  notice({
            text: 'enter your query',
            delay: 3000,
        }) ;
    }
   
    newsApiService.fetchCountries();
      clearContainer() 

};

function clearContainer() {
  countriesMarkup.innerHTML = '';
}

search.addEventListener('input', debounce(searchInput, 500));
