import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './presentation/login/Login.tsx'
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        draggable
      />
      <LoginPage />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)


