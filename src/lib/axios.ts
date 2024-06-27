import Axios from 'axios';
import {API_URL, BACKEND_URL} from '../config';

export let id = localStorage.getItem('user-id')

// localStorage.setItem('user-id', '2')

export const idUpdate = () =>{
  id = localStorage.getItem('user-id')
  if (localStorage.getItem('user-id') == undefined || localStorage.getItem('user-id') == null){
    id = '1'
  }
}


export const axios = Axios.create({
  baseURL: API_URL,
  headers:{
    // Authorization: 'Token ' + token
    'user-id':id
  }
});



