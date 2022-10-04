import style from '../../styles/Etiquetas.module.css'
import {useRouter} from "next/router";
import pedidosService from "../../services/pedidos";
import {useEffect, useState} from "react";
import {store} from "../../app/store";

export default function EtiquetaMedicamento() {
    const router = useRouter()
    const [pedido, setPedido] = useState(null)
    const [etiquetas, setEtiquetas] = useState(null)

    useEffect(() => {
        setTimeout(function () {
            setPedido(store.get('pedido'))
            render()
        }, 2000);
    })

    async function updatePedidoImpressoes() {
        pedido.impressao? pedido.impressao[2] = true: pedido.impressao = [false, false, true]
        await pedidosService.update(pedido)
    }

    function getNextDate(current, increment) {
        let vezesAo = increment[3]
        let date = new Date(current)
        if (vezesAo === 'Dia') return date.getDate() + 1
        else if (vezesAo === 'Semana') return date.getDate() + 7
        else if (vezesAo === 'Mês') return date.setMonth(date.getMonth() + 1)
    }

    function render() {
        const etiquetas = []
        for (let i = 0; i < pedido?.medicamentos.length; i++) {
            const last = new Date(pedido?.medicamentos[i].periodo[1])
            last.setDate(last.getDate() + 1)
            for (let d = new Date(pedido?.medicamentos[i].periodo[0]); d < last;  d.setDate(getNextDate(d, pedido.medicamentos[i].posologia))) {
                let medicamento = pedido?.medicamentos[i]
                const qtd = Number(pedido?.medicamentos[i].posologia[2].replaceAll('_', ''))
                for (let n = 0; n < qtd; n++) {
                    etiquetas.push(
                        <div key={d.getTime()} className={style.etiquetaMedicamento}>
                            <div>
                                <div className={style.etiquetaMedicamentoNomeText}>{pedido?.medicamentos[i].nome_medicamento}</div>
                                <div className={style.etiquetaMedicamentoNomeText}>{pedido?.medicamentos[i].concentracao}</div>
                                <hr/>
                            </div>
                            <div className={style.etiquetaMedicamentoTitleText}>FABRICANTE:</div>
                                 <div className={style.etiquetaMedicamentoSubtitleText}>{ medicamento.laboratorio }</div>
                                 <br/>
                                 <div className={'row'}>
                                     <div className={'col'} style={{marginRight: 15}}>
                                         <div className={style.etiquetaMedicamentoTitleText}>LOTE:</div>
                                         <div className={style.etiquetaMedicamentoSubtitleText}>{ medicamento.lote }</div>
                                         <div className={style.etiquetaMedicamentoTitleText}>VALIDADE:</div>
                                         <div className={style.etiquetaMedicamentoSubtitleText}>{ medicamento.validade }</div>
                                     </div>
                                     <div className={'col'} style={{width: 58}}>
                                         <div className={style.etiquetaMedicamentoTitleText}>ADMINISTRAR VIA</div>
                                         <div className={style.etiquetaMedicamentoViaBox}>{ medicamento.administracao }L</div>
                                     </div>
                                 </div>
                        </div>
                    )
                }
            }
        }
        setEtiquetas(etiquetas)
    }

        return (
            <div>
                <div className={style.rowMedicamento}>
                    { etiquetas }
                </div>
                <button onClick={async() => { window.print(); await updatePedidoImpressoes() }} className={'printButton'}>Imprimir</button>
                <button onClick={() => router.back()} className={'backButton'}>Voltar</button>
            </div>
        )
}