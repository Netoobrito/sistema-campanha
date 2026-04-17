import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import PageContainer from '../components/PageContainer'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts'

export default function Dashboard() {

  const [pizza, setPizza] = useState([])
  const [bar, setBar] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function carregar() {

      const { data, error } = await supabase
        .from('eleitores')
        .select('status_atual')

      if (error || !data) return

      const cont = {
        apoiador: 0,
        indeciso: 0,
        oposicao: 0
      }

      data.forEach(e => {
        if (e.status_atual === 'apoiador') cont.apoiador++
        if (e.status_atual === 'indeciso') cont.indeciso++
        if (e.status_atual === 'oposicao') cont.oposicao++
      })

      setPizza([
        { name: 'Apoiadores', value: cont.apoiador },
        { name: 'Indecisos', value: cont.indeciso },
        { name: 'Oposição', value: cont.oposicao }
      ])

      setBar([
        { name: 'Apoiadores', total: cont.apoiador },
        { name: 'Indecisos', total: cont.indeciso },
        { name: 'Oposição', total: cont.oposicao }
      ])

      setLoading(false)
    }

    carregar()

    const channel = supabase
      .channel('eleitores')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'eleitores'
        },
        () => carregar()
      )
      .subscribe()

    return () => supabase.removeChannel(channel)

  }, [])

  const COLORS = ['#22c55e', '#eab308', '#ef4444']

  return (
    <PageContainer title="📊 Dashboard">

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {/* 🍕 PIZZA */}
          <div className="h-[300px]">
            <h3 className="font-semibold mb-2">Distribuição</h3>

            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pizza}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {pizza.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 BARRAS */}
          <div className="h-[300px]">
            <h3 className="font-semibold mb-2">Comparação</h3>

            <ResponsiveContainer>
              <BarChart data={bar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}

    </PageContainer>

  )
}