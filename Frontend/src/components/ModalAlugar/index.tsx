import * as Dialog from '@radix-ui/react-dialog';
import { X } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import { ApartamentoContext } from '../../context/apartamentoContext';

import { CloseButton, Content, Overlay } from './style';

interface Locacao {
  apartamentoId: string;
  moradorId: string;
  alugado_em: string;
  alugado_ate: string;
}

export function ModalAlugar() {

  const criarLocacao = useContextSelector(
    ApartamentoContext,
    (context) => {
      return context.criarLocacao
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Locacao>()


  // async function cadastrarLocacao(data: Locacao) {
  //   const { tamanho, andar, valor, predioId } = data

  //   await criarLocacao({
  //     tamanho,
  //     andar,
  //     valor,
  //     predioId,
  //     alugado: false,
  //   })
  //   reset()
  // }
   // onSubmit={handleSubmit (cadastrarApartamento)}
    return (
      <Dialog.Portal>
        <Overlay />

        <Content>
          <Dialog.Title>Alugar</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>
         
          <form>
            <input type="text" placeholder="Documento do Morador" required />
            <input type="text" placeholder="Nome do Morador" required />
            <input type="number" placeholder="Email do Morador" required />
            <input type="number" placeholder="Telefone do Morador" required />
            <input type="text" placeholder="Inicio" required />
            <input type="text" placeholder="Fim" required />
            <button type="submit">
              Alugar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    );
}