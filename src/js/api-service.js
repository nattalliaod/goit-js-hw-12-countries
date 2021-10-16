const BASE_URL = 'https://restcountries.com/v2/name';

export default {
fetchCountries (searchQuery) {
    return fetch(`${BASE_URL}/${searchQuery}`)
    .then(response => response.json())
}
} 

 