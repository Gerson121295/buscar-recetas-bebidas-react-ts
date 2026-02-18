import type { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import type { FavoritesSliceType } from "./favoritesSlice"

//Type de los States y funtions de createRecipeSlice
export type RecipesSliceType = {
    categories : Categories
    drinks : Drinks
    selectedRecipe : Recipe
    modal : boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}


export const createRecipeSlice : StateCreator<RecipesSliceType & FavoritesSliceType, // se agrego: & FavoritesSliceType, [], [], RecipesSliceType -> Porque en favoriteSlice se consumira estados de recipeSlice
      [], [], RecipesSliceType  //los 2 [] indica que no se espera otros parametros adicionales y escribir de nuevo -> RecipesSliceType indica que es el type para este Slice
> = (set) => ({ //set, get, api

    //State y funciones del Slice
  categories: { //se inicializa un objeto y se define un drinks como objeto vacio
    drinks: []
  },

  drinks: {
    drinks:[]
  },

  selectedRecipe: {} as Recipe,
  modal : false, //inicado con false por defecto el modal estará cerrado

  fetchCategories: async () => {
    
    //Llama a la funcion getCategories y establece las categorias a categories
    const categories = await getCategories();
    //console.log(categories)
    set({
        categories  //categories:categories  //como es igual el state con la variable dentro de fetchCategories que recibe las categorios entonces solo se escribe una vez
    })
  },

  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters);
    set({
      drinks
    })
  },

  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id)
    set({
      selectedRecipe,
      modal: true
    })
  },

  closeModal: () => {
    set({
      modal: false, //cierra el modal
      selectedRecipe: {} as Recipe //se reinicia, pasa como a ser un objeto vacio
    })
  }


})



