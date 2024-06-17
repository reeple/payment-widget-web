import axios from 'axios';
import constants from '@config/constants';

const {
  API: { baseURL, timeout },
} = constants;

const finver = axios.create({
  baseURL,
  timeout,
});

export default finver;
