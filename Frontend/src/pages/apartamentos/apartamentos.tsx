import { useContextSelector } from 'use-context-selector';
import { Header } from '../../components/Header';
import { ApartamentoContext } from '../../context/apartamentoContext';
import { Locacao } from '../../components/locacao';
import {
  ApartamentoAlugado,
  ApartamentoContainer,
  TabelaApartamentos,
} from './style';
import { BotaoAluguel } from '../../components/BotaoAluguel';

export function Apartamentos() {
  const apartamentos = useContextSelector(ApartamentoContext, (context) => {
    return context.apartamentos;
  });
  return (
    <div>
      <Header />

      <ApartamentoContainer>
        <TabelaApartamentos>
          <tbody>
            <th>Situação</th>
            <th></th>
            <th>Tamanho</th>
            <th>Andar</th>
            <th>Preço</th>
            <th>Alugado Até</th>
            {apartamentos.map(apartamento => (
              <tr key={apartamento.id}>
                <td>
                  <ApartamentoAlugado variant={!apartamento.alugado}>
                    {apartamento.alugado ? 'Alugado' : 'Livre'}
                  </ApartamentoAlugado>
                </td>
                <td>
                  <BotaoAluguel 
                    apartamentoAlugado = {apartamento.alugado}
                  />
                </td>
                <td>{apartamento.tamanho}</td>
                <td>{apartamento.andar}</td>
                <td>{apartamento.valor}R$</td>
                <Locacao 
                    apartamentoId= {apartamento.id}
                />
              </tr>
            ))}
          </tbody>
        </TabelaApartamentos>
      </ApartamentoContainer>
    </div>
  );
}
