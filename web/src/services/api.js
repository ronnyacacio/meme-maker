import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.imgflip.com',
});

export default api;
