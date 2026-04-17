import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Eleitores from './pages/Eleitores'
import Visitas from './pages/Visitas'
import Busca from './pages/Busca'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro" element={<Eleitores />} />
        <Route path="/visitas" element={<Visitas />} />
        <Route path="/busca" element={<Busca />} />

      </Routes>
    </BrowserRouter>
  )
}