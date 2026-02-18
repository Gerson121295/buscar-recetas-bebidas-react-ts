import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import Modal from "../components/Modal"
import { useAppStore } from "../store/useAppStore"
import { useEffect } from "react"
import Notification from "../components/Notification"

export const Layout = () => {

  const loadFromStorage = useAppStore((state) => state.loadFromStorage);
  //const notification = useAppStore((state) => state.notification)

  //Al cargar la pagina por primera vez se carga las recetas favoritas desde el localStorage al State
  useEffect(() => {
    loadFromStorage()
  }, [] )

  return (
    <>
      <Header />

      <main className="container mx-auto py-16">
        <Outlet  //Muestra el contenido de los componentes o paginas
        />
      </main>

      <Modal/>
      <Notification />
    </>
  )
}


