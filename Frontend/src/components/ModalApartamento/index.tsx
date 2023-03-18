import * as Dialog from '@radix-ui/react-dialog';
import { useContextSelector } from 'use-context-selector'
import { CloseButton, Content, Overlay } from './style';
import { ApartamentoContext } from '../../context/apartamentoContext'
import { X } from 'phosphor-react';
import { useForm } from 'react-hook-form';

interface Apartamento {
  tamanho: string;
  andar: string;
  valor: number;
  predioId: string
  alugado: boolean;
} 
export function ModalApartamento() {
  const criarApartamento = useContextSelector(
      ApartamentoContext,
    (context) => {
      return context.criarApartamento
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Apartamento>()

  
  async function cadastrarApartamento(data: Apartamento) {
    const { tamanho, andar, valor, predioId } = data
  
    await criarApartamento({
          tamanho,
          andar,
          valor,
          predioId,
          alugado: false,
        })
    reset()
  }
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Novo Apartamento</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit (cadastrarApartamento)}>
          <input
            type="text"
            placeholder="Tamanho"
            required
            {...register('tamanho')}
          />
          <input
            type="text"
            placeholder="Andar"
            required
            {...register('andar')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('valor', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Predio"
            required
            {...register('predioId')}
          />

          <button type="submit">
            Cadastrar
          </button>
        </form >
      </Content>
    </Dialog.Portal>
  );
}