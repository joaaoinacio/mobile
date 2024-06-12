import axios from 'axios';
import apiErros, {voidError} from './apiErrors';
import AuthController from '../controllers/AuthController';
import { isEmpty } from 'lodash';

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  if(isEmpty(error)) {
    voidError()
    return Promise.reject('Network Error!')
  }
  if(isEmpty(error.response)) {
    voidError()
    return Promise.reject('Network Error!')
  }
  console.log(error.response)
  apiErros(error.response)
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if(isEmpty(error)) {
    voidError()
    return Promise.reject('Network Error!')
  }
  if(isEmpty(error.response)) {
    voidError()
    return Promise.reject('Network Error!')
  }
  console.log(error.response)
  apiErros(error.response)
  return Promise.reject(error)
})

axios.defaults.headers.common = {
  Authorization: AuthController.getAuthorization(), 
  'Content-Type': 'application/x-www-form-urlencoded'

}
axios.defaults.withCredentials=false;

export default axios