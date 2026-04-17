import { useState } from 'react'
import { supabase } from '../supabase'
import PageContainer from '../components/PageContainer'

export default function Eleitores() {

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [cep, setCep] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')

  // 🧠 CPF máscara simples
  function formatarCPF(valor) {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  function handleCPF(e) {
    setCpf(formatarCPF(e.target.value))
  }

  // 🌍 CEP automático
  async function handleCEP(e) {
    const valor = e.target.value
    setCep(valor)

    const cepLimpo = valor.replace(/\D/g, '')

    if (cepLimpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await res.json()

        if (!data.erro) {
          setCidade(data.localidade || '')
          setBairro(data.bairro || '')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  function normalizarTexto(texto) {
    return texto
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  async function salvar() {

    const cpfLimpo = cpf.replace(/\D/g, '')

    if (!nome || !cpfLimpo || !cidade || !bairro) {
      alert('Preencha todos os campos')
      return
    }

    const cidadeFormatada = normalizarTexto(cidade)
    const bairroFormatado = normalizarTexto(bairro)

    // 🔍 duplicado CPF
    const { data: existe } = await supabase
      .from('eleitores')
      .select('id')
      .eq('cpf', cpfLimpo)
      .maybeSingle()

    if (existe) {
      alert('CPF já cadastrado!')
      return
    }

    const { error } = await supabase
      .from('eleitores')
      .insert([{
        nome,
        cpf: cpfLimpo,
        cep,
        bairro: bairroFormatado,
        cidade: cidadeFormatada
      }])

    if (error) {
      console.log(error)
      alert('Erro ao salvar')
    } else {
      alert('Eleitor cadastrado com sucesso!')

      setNome('')
      setCpf('')
      setCep('')
      setBairro('')
      setCidade('')
    }
  }

  return (
    <PageContainer title="👥 Cadastrar Eleitor">

      {/* NOME */}
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      {/* CPF */}
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="CPF"
        value={cpf}
        onChange={handleCPF}
        maxLength={14}
      />

      {/* CEP */}
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="CEP (ex: 56800-000)"
        value={cep}
        onChange={handleCEP}
        maxLength={9}
      />

      {/* BAIRRO (auto + editável) */}
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Bairro"
        value={bairro}
        onChange={e => setBairro(e.target.value)}
      />

      {/* CIDADE (auto + editável) */}
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Cidade"
        value={cidade}
        onChange={e => setCidade(e.target.value)}
      />

      {/* BOTÃO */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        onClick={salvar}
      >
        Salvar
      </button>

    </PageContainer>
  )
}