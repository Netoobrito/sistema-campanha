import { useNavigate } from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="w-full max-w-4xl">

        <h1 className="text-3xl font-bold text-center mb-8">
          🗳 Sistema de Campanha
        </h1>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div
            onClick={() => navigate('/cadastro')}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-xl font-bold mb-2">👥 Cadastrar Eleitor</h2>
            <p className="text-gray-500">Adicionar novos eleitores no sistema</p>
          </div>

          <div
            onClick={() => navigate('/visitas')}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-xl font-bold mb-2">📝 Registrar Visita</h2>
            <p className="text-gray-500">Registrar visitas realizadas</p>
          </div>

          <div
            onClick={() => navigate('/busca')}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-xl font-bold mb-2">🔎 Buscar Eleitores</h2>
            <p className="text-gray-500">Buscar por nome, cidade ou bairro</p>
          </div>

          <div
            onClick={() => navigate('/dashboard')}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-xl font-bold mb-2">📊 Dashboard</h2>
            <p className="text-gray-500">Ver gráficos e estatísticas</p>
          </div>

        </div>

      </div>

    </div>
  )
}