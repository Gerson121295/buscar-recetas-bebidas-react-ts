import { useEffect, useMemo, useState, ChangeEvent } from "react";
import {  NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore";


export const Header = () => {

    const [searchFilters, setSearchFilters] = useState({
        ingredient : '',
        category: ''
    })

    //const location = useLocation(); //para encontrar la ubicacion del usuario
    //console.log(location.pathname)

    const { pathname } = useLocation();
    
    const isHome = useMemo(() => pathname === '/', [pathname]); //isHome es true o false
    //console.log(isHome);

    //extrae los estados y funciones del store useAppStore
    const categories = useAppStore((state) => state.categories);
    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const searchRecipes = useAppStore((state) => state.searchRecipes);
    const showNotification = useAppStore((state) => state.showNotification);

    useEffect(() => {
        fetchCategories();
    }, [])

    const handleChange = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = ( e: React.SubmitEvent<HTMLFormElement>) => { //FormEvent
        e.preventDefault() //evita que al enviar el formulario se recargue la pagina

        //Validar
        if(Object.values(searchFilters).includes('')){
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: false
            })
            //console.log('Todos los campos son obligatorios')
            return
        }

        //Consultar la receta
        searchRecipes(searchFilters)
    }


  return (
    <header 
         className={isHome ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'}
    >
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav 
                        className="flex gap-4"
                    >
                        {/* Para redirigir a rutas usar Link y NavLink. No usar a  porque resta performace
                            //NavLink tiene acceso a un callback del className para detectar la pagina actual(para poder resaltar) 
                        */}
                        <NavLink 
                            to='/'
                            //className="text-white uppercase font-bold"
                            className={({isActive}) => 
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        > 
                            Inicio  
                        </NavLink>

                        <NavLink 
                            to='/favoritos'
                            className={({isActive}) => 
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        > 
                            Favoritos  
                        </NavLink>

                        <NavLink 
                            to='/generar-ia'
                            className={({isActive}) => 
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        > 
                            Generar con AI 
                        </NavLink>
                    </nav>
                </div>
                {
                    isHome && (
                        <form 
                            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg 
                            shadow space-y-6"
                            onSubmit={ handleSubmit }
                        >
                            <div className="space-y-4">
                                <label 
                                    htmlFor="ingredient"
                                    className="block text-white uppercase font-extrabold text-lg"
                                >
                                    Nombre o Ingrediente
                                </label>
                                <input 
                                    id="ingredient" 
                                    type="text" 
                                    name="ingredient"
                                    className="p-3 w-full rounded-lg focus:outline-none bg-amber-50"
                                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                                    onChange={ handleChange}
                                    value={searchFilters.ingredient}
                                />
                            </div>

                            <div className="space-y-4">
                                <label 
                                    htmlFor="category"
                                    className="block text-white uppercase font-extrabold text-lg"
                                >
                                    Categoria
                                </label>
                                <select 
                                    id="category"
                                    name="category"
                                    className="p-3 w-full rounded-lg focus:outline-none bg-amber-50"
                                    onChange={ handleChange }
                                    value={searchFilters.category}
                                >
                                    <option value="">-- Seleccione --</option>
                                    {categories.drinks.map( category => (
                                        <option 
                                            value={category.strCategory}
                                            key={category.strCategory}
                                        >
                                            {category.strCategory}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <input 
                                type="submit" 
                                value='Buscar Recetas'
                                className="cursor-pointer bg-orange-800 hover:bg-amber-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                                
                            />
                        </form>
                    )
                }
            </div>
    </header>
  )
}

