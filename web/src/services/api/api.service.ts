import { getAPIBaseURL } from '@/utils/get-api-base-url';
import axios from 'axios';

export const api = axios.create({
  baseURL: getAPIBaseURL(),
});
