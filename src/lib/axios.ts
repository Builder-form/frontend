import Axios from 'axios';
import {API_URL, BACKEND_URL} from '../config';
console.log(BACKEND_URL)

export let token = localStorage.getItem('token')


export const tokenUpdate = () =>{
  token = localStorage.getItem('token')
}

export const axios = Axios.create({
  baseURL: API_URL,
  
  headers:{
    Authorization: 'Token ' + token
  }
});

export const axiosNonAuth = Axios.create({
  baseURL: API_URL,
});

export const auth = Axios.create({
    baseURL:BACKEND_URL + 'auth/',

})

export const userApi =  Axios.create({
  baseURL:BACKEND_URL + 'user/',

  headers:{
    Authorization: 'Token ' + token
  }
})