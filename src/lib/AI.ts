
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

//Archivo para guarda la url de openroute.ai

export const openrouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_KEY
    
})