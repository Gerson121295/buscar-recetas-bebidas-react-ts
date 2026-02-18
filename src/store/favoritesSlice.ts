import type { StateCreator } from 'zustand';
import type { Recipe } from '../types';
import { createRecipeSlice, type RecipesSliceType } from './recipeSlice';
import { createNotificationSlice, type NotificationSliceType } from './notificacionSlice';


// Tipos de datos de states y funciones del Slice
export type FavoritesSliceType = {
    favorites:  Recipe[]
    handleClickfavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createfavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType 
                & NotificationSliceType, // se agrego:  & RecipesSliceType & NotificationSliceType,[], [], FavoritesSliceType -> Porque en favoriteSlice se consumira estados de recipeSlice y notificationSlice(NestedSlices para consumir slices en otro)
            [], [], FavoritesSliceType  //los 2 [] indica que no se espera otros parametros adicionales y escribir de nuevo -> FavoritesSliceType indica que es el type para este Slice
            > = (set, get, api) => ({
    favorites: [],

    handleClickfavorite : (recipe) => {
        //if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)){ //get obtiene los estados
        if(get().favoriteExists(recipe.idDrink)){ //get obtiene los estados
            //console.log('Si existe')
            set((state) => ({
                //Elimina de Favoritos
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
            }))

            //LLama a la funcion showNotification del slice notificationSlice
            createNotificationSlice(set,get,api).showNotification(
                {
                    text: 'Se eliminó de favoritos.',
                    error: false
                }
            )

        }else{
            //console.log('No existe')

            //F1- Agregar la receta mediante - Get
         /*    set({
                favorites: [
                    ...get().favorites, //creamos una copia de las recetas favoritas anteriores
                    recipe  //agregamos una receta actual
                ]
            }) */

             //F2- Agregar la receta mediante - state
            set((state) => ({ //state como callback
                favorites: [
                    ...state.favorites, //creamos una copia de las recetas favoritas anteriores
                    recipe  //agregamos una receta actual
                ]
            }))

             //LLama a la funcion showNotification del slice notificationSlice
            createNotificationSlice(set,get,api).showNotification(
                {
                    text: 'Se agrego a favoritos.',
                    error: false
                }
            )
        }

        //Consumir Estados de otra Slice - RecipesSlice
        createRecipeSlice(set, get, api).closeModal(); //accede al metodo closeModal de recipeSlice

        //Establecer las recetas favoritas en el LocalStorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    //Verifica si ya existe la receta en favoritos
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },

    loadFromStorage : () => {
        //Cargamos las recetas favoritas desde el localStorage
        const storedFavorites = localStorage.getItem('favorites');

        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }

})
