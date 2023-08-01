import { toast } from 'react-toastify';
import axios, { AxiosError, type AxiosInstance } from 'axios'
import config from './config'
import HttpStatusCode from '../constants/httpStatusCode.enum';

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
        // 'expire-access-token': 60 * 60 * 24, // 1 ngày
        // 'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
      }
    })
    this.instance.interceptors.response.use(function (response) {

      return response;
    }, function (error: AxiosError) {
      if (error.response?.status != HttpStatusCode.UnprocessableEntity) {
        const data: any | undefined = error.response?.data
        const message = data.message || error.message
        toast.error(message)
      }
      return Promise.reject(error);
    });
  }
}

const http = new Http().instance
export default http
