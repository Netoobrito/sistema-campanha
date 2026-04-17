import { useState } from 'react'
import { supabase } from '../supabase'
import PageContainer from '../components/PageContainer'

export default function Visitas() {

  const [nome, setNome] = useState('')
  const [resultado, setResultado] = useState('indeciso')
  const [obs, setObs] = useState('')

  async function salvar() {

    const { data: eleitor } = await supabase
      .from('eleitores')
      .select('id')
      .eq('nome', nome)
      .single()

    if (!eleitor) {
      alert('Eleitor não encontrado')
      return
    }

    const { error } = await supabase
      .from('visitas')
      .insert([
        {
          eleitor_id: eleitor.id,
          resultado,
          observacoes: obs
        }
      ])

    if (error) {
      alert('Erro ao salvar visita')
    } else {
      alert('Visita registrada!')
      setNome('')
      setObs('')
    }
  }

  return (
    <PageContainer title="📝 Registrar Visita">

      <input className="border p-2 rounded w-full mb-3" placeholder="Nome do eleitor" value={nome} onChange={e => setNome(e.target.value)} />

      <select className="border p-2 rounded w-full mb-3" value={resultado} onChange={e => setResultado(e.target.value)}>
        <option value="apoiador">Apoiador</option>
        <option value="indeciso">Indeciso</option>
        <option value="oposicao">Oposição</option>
        <option value="nao_encontrado">Não encontrado</option>
      </select>

      <input className="border p-2 rounded w-full mb-3" placeholder="Observações" value={obs} onChange={e => setObs(e.target.value)} />

      <button className="bg-green-500 text-white px-4 py-2 rounded w-full" onClick={salvar}>
        Salvar visita
      </button>

    </PageContainer>
  )
}