import type { StateCreator } from "zustand"
import AIService from "../services/AIService"




export type AISlice = {
    recipe: string
    isGenerating: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice : StateCreator<AISlice> = (set) => ({  //<AISlice, [], [], AISlice>
    
    recipe: '',
    isGenerating: false,

    generateRecipe: async (prompt) => {

        set({ 
                recipe: '',
                isGenerating: true
            }) // limpiar antes la receta

        const data = await AIService.generateRecipe(prompt)

        //Mostrar el resultado que se va generando en la pantalla
        for await (const textPart of data){  //await espera mientras se genera
            //Agrega la respuesta que genera la AI en recipe
            set((state => ({
                recipe: state.recipe + textPart
            })))
        }

        set({
            isGenerating: false
        })
    }

})

