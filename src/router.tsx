import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
//import { IndexPage } from './views/IndexPage';
//import { FavoritesPage } from './views/FavoritesPage';
import { Layout } from "./layouts/Layout";

//Para evitar que el usuario al acceder a pagina inicio IndexPage cargue todas las paginas haciendo lento, Asi solo cargue la pagina de inicio
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))
const IndexPage = lazy(() => import('./views/IndexPage'))

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route  
            element = {<Layout/>}  //al agrugar varios route dentro de uno permite desplegar un componente dentro de estos
        >
            <Route 
                path='/' //Ruta de la pagina 
                //element = {<IndexPage />}   //elemento a cargar en esa ruta definida en le path
                element = { //Permite al usuario cargar solo la pagina que visita asi evita cargar todo al ingresar, evita lento la pagina
                  <Suspense fallback="Cargando...">
                    <IndexPage />
                  </Suspense>
                }
                index //para definir que es la pagina principal
            />  
                    
            <Route 
                path='/favoritos'
                //element = {<FavoritesPage /> } //sin lazy
                element ={
                  <Suspense fallback="Cargando...">
                    <FavoritesPage />
                  </Suspense>
                }
            />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}



