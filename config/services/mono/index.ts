import axios from 'axios';
import constants from '@config/constants';

const {
  API: { monoBaseUrl, timeout },
} = constants;

const mono = axios.create({
  baseURL: monoBaseUrl,
  timeout,
});

export default mono;
