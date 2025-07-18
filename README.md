# 🛍️ Catálogo de Productos — App Técnica en Next.js + TypeScript + shadcn/ui

Esta es una aplicación simple pero potente construida con **Next.js 15**, **TypeScript** y **shadcn/ui**, que permite gestionar un catálogo de productos con funcionalidades modernas y una interfaz elegante.

---

## ✨ Funcionalidades

- ✅ Agregar, editar y eliminar productos.
- ✍️ Validación robusta de formularios con **Zod**.
- 🔍 Filtrado por **nombre**, **proveedor**, **precio** y **fecha**, con distintos operadores (`igual`, `mayor`, `menor`).
- 📆 Input dinámico que cambia según el campo (texto o fecha).
- 💾 Almacenamiento persistente con `localStorage` (sin necesidad de backend).
- 📱 Diseño completamente responsive.
- 🧭 Paginación para navegar fácilmente en grandes listas.
- 📂 Drawer lateral con accesos rápidos para:
  - Cargar datos de ejemplo.
  - Eliminar todos los datos almacenados.
- 🔔 Notificaciones elegantes con **sonner**.
- 🎨 Fondo animado moderno con **Silk** (React Bits).

---

## 🛠️ Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) – Validación de formularios
- [shadcn/ui](https://ui.shadcn.com/) – Componentes accesibles y estilizados
- [Tailwind CSS](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/) – Notificaciones tipo toast
- React Hooks (`useState`, `useEffect`)
- `localStorage` como sistema de persistencia

### 🚀 Cómo correr la app localmente

1. Clonar el repositorio:

```bash
git clone https://github.com/EnzoP7/pruebaTecnicaEnzo
```

2. Instalar dependencias:

```bash
npm install
```

3.Instalar dependencias:

```bash
npm run dev
```

4 .Visualizar en:

```bash
 http://localhost:3000
```
