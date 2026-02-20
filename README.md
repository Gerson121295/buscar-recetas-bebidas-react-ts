# Buscador de Recetas de bebidas
### React y TypeScript - La Guía Completa Creando +10 Proyectos -

## 🍹 Descripción del Proyecto

Aplicación web para buscar recetas de bebidas construida con React y TypeScript. Permite explorar diferentes bebidas, ver sus ingredientes y modo de preparación a través de una interfaz intuitiva y responsive.
Se actualizó agregando módulo de menú "Generar con AI" que permite usar un modelo de IA para solicitar recetas de bebidas personalizadas.

## 🛠️ Tecnologías y Herramientas

- **Frontend Framework**: React 18
- **Lenguaje**: TypeScript
- **Enrutamiento**: React Router DOM
- **State Management**: Zustand con Slice Pattern
- **Validaciones**: Zod
- **Estilos**: CSS/Tailwind CSS
- **Herramientas de Desarrollo**: Vite
- **Control de Versiones**: Git
- **IA Integration**: OpenRouter API

## ✨ Características Principales

- ✅ Múltiples páginas navegables
- ✅ Buscador de recetas de bebidas
- ✅ Generador de recetas con IA (OpenRouter)
- ✅ Gestión de estado con Zustand
- ✅ Validaciones de formularios
- ✅ Interfaz responsiva
- ✅ Arquitectura escalable con Slice Pattern

## 📦 Instalación

```bash
git clone https://github.com/Gerson121295/buscar-recetas-bebidas-react-ts.git
cd buscar-recetas-bebidas-react-ts
npm install
npm run dev
```

## 🤖 Instalación de dependencias para IA

```bash
npm install @openrouter/ai-sdk-provider
npm install ai
# Si hay problemas de peer dependencies:
npm install @openrouter/ai-sdk-provider --legacy-peer-deps
```

## 🔑 Configuración de OpenRouter

1. Crear cuenta en [OpenRouter](https://openrouter.ai/)
2. Generar API Key en dashboard (Crear nueva clave: "Bebidas React")
3. Seleccionar modelo en https://openrouter.ai/models (recomendado: filtrar por precio free)
4. Copiar ID del modelo y agregarlo en AIService

## 👨‍💻 Autor

[Gerson121295](https://github.com/Gerson121295)


