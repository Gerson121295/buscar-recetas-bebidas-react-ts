
import { streamText } from 'ai'
import { openrouter } from '../lib/AI'
/* export default {
    async generateRecipe(prompt: string){
        console.log(prompt)
    }
} */

/*
-> Seleccionar el modelo -> Desplegar Series -> Click en more -> Filtrar por prising free 
->  https://openrouter.ai/models  -> https://openrouter.ai/models?max_price=0&q=llama
-> Clic en el titulo y copiar el id ara pegarlo en AIService: meta-llama/llama-3.3-70b-instruct:free
*/

    const AIService = {
        generateRecipe: async (prompt: string) => {
            //console.log(prompt)
            const result = streamText({
                model: openrouter('google/gemma-3n-e4b-it:free'), //se pasa el modelo: 'google/gemma-3n-e2b-it:free'
                //model: openrouter('google/gemma-3-27b-it:free'),
                //model: openrouter('nvidia/nemotron-nano-12b-v2-vl:free'),
                //model: openrouter('sourceful/riverflow-v2-standard-preview'),
                prompt, // prompt: prompt   //se envia el prompt
                //system es para darle el comportamiento a la IA. No todas los modelos de IA lo soporta
                //system: 'Eres un experto haciendo recetas de bebidas',
                temperature: 0.9 // es para darle mas creatividad a la respuesta, entre mas alto mas creativo, entre mas bajo mas preciso

            })

            return result.textStream  //textStream porque no genera una respuesta rapida, genera un respuesta en flujo va por partes
        }
    }
    
    
    export default AIService
    

