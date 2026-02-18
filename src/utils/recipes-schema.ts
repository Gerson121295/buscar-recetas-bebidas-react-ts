import z from "zod";


// Tipado del schema que devuelve la API como respuesta -
// Los campos deben escribirse exactamente como los devuelve la API (mayúsculas o minúsculas).
// const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
export const CategoriesAPIResponseSchema = z.object({
    drinks : z.array(
        z.object({
            strCategory : z.string() 
        })
    )
})

export const SearchFilterSchema = z.object({
        ingredient : z.string(),
        category: z.string()
    })


//const url= `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
export const DrinkAPIResponse = z.object({ //Version en singular
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
})

export const DrinksAPIResponse = z.object({ //Version en plural
    drinks: z.array(DrinkAPIResponse)
})

export const RecipeAPIResponseSchema = z.object({
  idDrink: z.string(),
  strDrink: z.string(),
  strDrinkThumb: z.string(),
  strInstructions: z.string(),
  strIngredient1: z.string().nullable(), //se agrega nullable() porque puede o no venir
  strIngredient2: z.string().nullable(),
  strIngredient3: z.string().nullable(),
  strIngredient4: z.string().nullable(),
  strIngredient5: z.string().nullable(),
  strIngredient6: z.string().nullable(),
  strMeasure1: z.string().nullable(),
  strMeasure2: z.string().nullable(),
  strMeasure3: z.string().nullable(),
  strMeasure4: z.string().nullable(),
  strMeasure5: z.string().nullable(),
  strMeasure6: z.string().nullable(),
});
