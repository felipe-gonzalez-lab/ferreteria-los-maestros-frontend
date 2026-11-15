
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Encabezado from './components/Encabezado'
import Navegacion from './components/Navegacion'
import PiePagina from './components/PiePagina'
import Inicio from './pages/Inicio' 
import Productos from './pages/Productos'

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light text-dark">
        <Encabezado />
        <Navegacion />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>

        <PiePagina />
      </div>
    </BrowserRouter>
  )
}

export default App
