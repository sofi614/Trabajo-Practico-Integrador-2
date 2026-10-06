# Frontend

Aplicacion React con JavaScript, creada con Vite. Incluye React Router, Tailwind CSS
4 con el plugin oficial de Vite y ESLint.

## Comandos

```sh
npm install
npm run dev
npm run lint
npm run build
```

El servidor de desarrollo de Vite usa `http://localhost:5173`. El backend acepta
peticiones con credenciales desde ese origen.

## Estructura de `src`

```text
src/
├── components/
│   └── Navbar.jsx
├── hooks/
│   ├── useFetch.js
│   └── useForm.js
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── router/
│   ├── AppRouter.jsx
│   ├── PrivateRoutes.jsx
│   └── PublicRoutes.jsx
├── App.jsx
├── index.css
└── main.jsx
```
