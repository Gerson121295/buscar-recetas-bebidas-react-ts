import { create } from "zustand";
import { createRecipeSlice, type RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createfavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";
import { createNotificationSlice, type NotificationSliceType } from "./notificacionSlice";
import { createAISlice, type AISlice } from "./aiSlice";


export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice  //Type de los Slice Recipes y Favorites
                >()(devtools( //()(devtools -> Agrega devtools para ver los states en el navegador
     (...a) => ({ //recibe una copia de todos los argumentos: ...a

        //SlicePatterns
    ...createRecipeSlice(...a), //agrega el slice Recipe
    ...createfavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))


