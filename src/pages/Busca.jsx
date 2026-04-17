import { useState } from 'react'
import { supabase } from '../supabase'
import PageContainer from '../components/PageContainer'

export default function Busca() {

  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [resultados, setResultados] = useState([])

  async function buscar() {

    let query = supabase.from('eleitores').select('*')

    if (nome) query = query.ilike('nome', `%${nome}%`)
    if (cidade) query = query.ilike('cidade', `%${cidade}%`)

    const { data } = await query

    setResultados(data || [])
  }

  return (
    <PageContainer title="🔎 Buscar Eleitores">

      <input className="border p-2 w-full mb-2" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4" onClick={buscar}>
        Buscar
      </button>

      <div className="space-y-2">
        {resultados.map(e => (
          <div key={e.id} className="p-3 bg-gray-100 rounded">
            <strong>{e.nome}</strong><br />
            {e.cidade} - {e.bairro}<br />
            Status: {e.status_atual}
          </div>
        ))}
      </div>

    </PageContainer>
  )
}