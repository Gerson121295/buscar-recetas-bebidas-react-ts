import axios from "axios";


//Archivo opcional para guardar variables constantes a urls para peticion
const api = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1'
})

export default api;