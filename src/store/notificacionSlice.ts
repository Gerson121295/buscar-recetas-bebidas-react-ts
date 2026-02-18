

import type { StateCreator } from 'zustand';
import type { FavoritesSliceType } from './favoritesSlice';

type Notification = {
    text: string
    error: boolean
    show: boolean
}

// Tipos de datos de states y funciones del Slice
export type NotificationSliceType = {
    notification: Notification
    showNotification: (payload: Pick<Notification, 'text'|'error'>) => void //payload recibe (con Pick seleccionamos los campos de Notificacion para payload)
    hideNotification: () => void
}
 
export const createNotificationSlice : StateCreator<NotificationSliceType & FavoritesSliceType, // se agrego:  & FavoritesSliceType,[], [], NotificationSliceType -> Porque en favoriteSlice se consumira estados de notificationSlice (NestedSlices para consumir slices en otro)
            [], [], NotificationSliceType //los 2 [] indica que no se espera otros parametros adicionales y escribir de nuevo ->  NotificationSliceType indica que es el type para este Slice
            > = (set, get) => ({
   
    //states
    //notification : {} as Notification  //F1 - Definir notification con objeto vacio como Notification
    notification : { // F2: Agregar los campos del objeto e inicizalizarlos 
        text: '',
        error: false,
        show: false
    },

    //Functions
    showNotification:(payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        //Despues de 5 milisegundos se manda a llamar hideNotification para ocultar la notificacion
        setTimeout(() => {
            get().hideNotification()
        }, 5000)
    },

    hideNotification:() => {
        set({ // Inicializa los campos del objeto 
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }

})
