import { HeaderContainer, HeaderContent, NovoApartamentoButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import { ModalApartamento } from '../ModalApartamento/index'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NovoApartamentoButton>Cadastrar Apartamento</NovoApartamentoButton>
          </Dialog.Trigger>

          <ModalApartamento />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
