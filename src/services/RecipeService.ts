import axios from "axios"
import api from "../lib/axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import type { Drink, SearchFilter } from "../types"


export const getCategories = async () => {
//export async function getCategories(){
    //const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'   //F1-Agregando la ruta completa
    const url = '/list.php?c=list' //Agrega solo la ruta de list categorias
    const { data } = await api(url) //Llama al api que contiene la ruta principal y le asigna la url de list categories
    
    //Valida data que devuelve la API con el tipado definido para la respuesta en CategoriesAPIResponseSchema
    const result = CategoriesAPIResponseSchema.safeParse(data);
    //console.log(result)

    //Retornamos la data si es success el result
    if(result.success){
        return result.data
    }
}


export async function getRecipes(filters : SearchFilter) {
    //www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink   --> Filtra por categoria
    //www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin          --> Filtra por Ingredient
    const url= `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios(url)
    //console.log(data)
    const result = DrinksAPIResponse.safeParse(data);

    //Retornamos la data si es success el result
    if(result.success){
        return result.data
    }
}


export const getRecipeById = async(id: Drink['idDrink']) => {
  //www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const { data } = await axios(url)

   const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);

    //Retornamos la data si es success el result
    if(result.success){
        return result.data
    }

}







