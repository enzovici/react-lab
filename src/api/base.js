import axios from 'axios'

//const apiHost = "http://api.tst2.appb.ch"  // temporary
 // const apiHost = "http://localhost:3201" // development
 const apiHost = "http://localhost:3001" // development


const base = axios.create({
  baseURL: apiHost,
  responseType: 'json',
});


export default base