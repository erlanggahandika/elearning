// utils/endpoint.js
// endpoint rest api

const BASE_URL = 'https://sekolahcasn.com/api/member';
export const ENDPOINTS = {
  GET_ALL: `${BASE_URL}/`, 
  LOGIN: `${BASE_URL}/token`,   
  REGISTER: `${BASE_URL}/register`, 
};

export default BASE_URL;
