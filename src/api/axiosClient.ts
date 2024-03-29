import axios from 'axios';

const baseURL = 'https://api.eien-development.com/api/pokemon-api';

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});
