import { useContextSelector } from "use-context-selector";
import { ApartamentoContext } from "../../context/apartamentoContext";

interface props {
    apartamentoId: string,
}
export function Locacao(props: props){
    const locacoes = useContextSelector(ApartamentoContext, (context) => {
        return context.locacoes;
      });
    const {  apartamentoId } = props
    console.log(locacoes)
    var alugadoAte 
    locacoes.find(locacao => {
        locacao.apartamentoId == apartamentoId ?
        alugadoAte = locacao.alugado_ate : alugadoAte = "N/A"
    })
    return (<td>{alugadoAte}</td>)

}