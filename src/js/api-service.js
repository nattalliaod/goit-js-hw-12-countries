const BASE_URL = 'https://restcountries.com/v2/name';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';

  }
  fetchCountries() {
    const url = `${BASE_URL}/${this.searchQuery}`;

    return fetch(url)
      .then(response => response.json())
      // .then(data => {
      //   return data
      // })
      
     


  }


  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }


}

