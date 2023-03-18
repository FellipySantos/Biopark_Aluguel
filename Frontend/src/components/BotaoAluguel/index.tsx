
import { ModalAlugar } from '../../components/ModalAlugar';
import * as Dialog from '@radix-ui/react-dialog';
import {AlugarButton, DesalugarButton} from './style'

interface props{
    apartamentoAlugado: boolean
}

export function BotaoAluguel (props: props){
    const apAlugado = props.apartamentoAlugado
    if(!apAlugado){
        return (
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <AlugarButton> Alugar </AlugarButton>
                </Dialog.Trigger>
                <ModalAlugar />
            </Dialog.Root>)
    }
    else {
        return (
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <DesalugarButton> Liberar </DesalugarButton>
                </Dialog.Trigger>
                <ModalAlugar />
            </Dialog.Root>)
    }
}