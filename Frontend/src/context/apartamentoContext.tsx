import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'
  interface Apartamento {
    tamanho: string;
    andar: string;
    valor: number;
    predioId: string
    alugado: boolean;
  }
  interface Apartamentos {
    id: string;
    tamanho: string;
    andar: string;
    valor: number;
    predioId: string
    alugado: boolean;
    criadoEm: string;
  }
  interface Locacao {
    apartamentoId: string;
    moradorId: string;
    alugado_em: string;
    alugado_ate: string;
  }
interface ApartamentosContextType {
  locacoes: Locacao[]
  fetchAlugueis: (query?: string) => Promise<void>
  criarLocacao: (data: Locacao) => Promise<void>,
  apartamentos: Apartamentos[]
  fetchApartamentos: (query?: string) => Promise<void>
  criarApartamento: (data: Apartamento) => Promise<void>
}

interface ApartamentossProviderProps {
  children: ReactNode
}

export const ApartamentoContext = createContext({} as ApartamentosContextType)

export function ApartamentoProvider({ children }: ApartamentossProviderProps) {
    const [apartamentos, setApartamentos] = useState<Apartamentos[]>([]);
    const [locacoes, setLocacoes] = useState<Locacao[]>([]);
    async function fetchApartamentos(query?: string) {
        const response = await api.get('Apartamentos', {
          params: {
            q: query,
          }

        })
        setApartamentos(response.data)
    }
    
    async function fetchAlugueis(query?: string) {
        const response = await api.get('Aluguel/', {
          params: {
            q: query,
          }

        })
        setLocacoes(response.data)
    }


  const criarApartamento = useCallback(
    async (data: Apartamento) => {
        const { tamanho, andar, valor, predioId } = data
  
        const response = await api.post('/Apartamentos', {
          tamanho,
          andar,
          valor,
          predioId,
          alugado: false,
        })
  
        setApartamentos(state =>[...state, response.data])
    },
    [],
  )
  const criarLocacao= useCallback(
    async (data: Locacao) => {
        const { apartamentoId, moradorId, alugado_em, alugado_ate } = data
  
        const response = await api.post('/Aluguel', {
            apartamentoId,
            moradorId, 
            alugado_em, 
            alugado_ate
        })
  
        setApartamentos(state =>[...state, response.data])
    },
    [],
  )
  useEffect(() => {
    fetchApartamentos()
  }, [])

  useEffect(() => {
    fetchAlugueis()
  }, [])
  return (
    <ApartamentoContext.Provider
      value={{
        locacoes,
        fetchAlugueis,
        criarLocacao,
        apartamentos,
        fetchApartamentos,
        criarApartamento,
      }}
    >
      {children}
    </ApartamentoContext.Provider>
  )
}