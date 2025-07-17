# ⚛️ React + TypeScript + Vite

A minimal setup for building React apps with Vite, TypeScript, HMR, and ESLint.

Project Name ---- Glenn Dashboard

## 🔌 Plugins

Choose one of the official React plugins for Fast Refresh:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) – uses **Babel**
- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react-swc) – uses **SWC**

## 🧹 ESLint Setup (Type-Aware)

For better linting in production apps, enhance ESLint with type support:

### 🔧 `parserOptions`

```ts
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})



# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
