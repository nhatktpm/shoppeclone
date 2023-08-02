import { toast } from 'react-toastify';
import axios, { AxiosError, type AxiosInstance } from 'axios'
import config from './config'
import HttpStatusCode from '../constants/httpStatusCode.enum';
import { AuthResponse } from '../types/auth.type';
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth';

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
        // 'expire-access-token': 60 * 60 * 24, // 1 ngày
        // 'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
      }
    })
    this.instance.interceptors.request.use((config) => {
      if (this.accessToken && config.headers) {
        config.headers.Authorization = this.accessToken
        return config
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    })


    this.instance.interceptors.response.use((response) => {
      const { url } = response.config
      if (url === '/login' || url === '/register') {
        this.accessToken = (response.data as AuthResponse).data.access_token
        saveAccessTokenToLS(this.accessToken)
      } else if (url === '/logout') {
        this.accessToken = ''
        clearAccessTokenFromLS()
      }
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
