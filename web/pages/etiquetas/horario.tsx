import style from "../../styles/Etiquetas.module.css";
import {useRouter} from "next/router";
import pedidosService from "../../services/pedidos";
import {useEffect, useState} from "react";
import {store} from "../../app/store";
import formatDate from '../../composables/formatDate'

export default function EtiquetaHorario() {
    const router = useRouter()
    const [pedido, setPedido] = useState(null)
    const [cliente, setCliente] = useState(null)
    const [etiquetas, setEtiquetas] = useState(null)
    const [counter, setCount] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setPedido(store.get('pedido'))
            setCliente(store.get('cliente'))
            render()
        })
    })

    async function updatePedidoImpressoes() {
        pedido.impressao? pedido.impressao[1] = true: pedido.impressao = [false, true, false]
        await pedidosService.update(pedido)
    }

    function render() {
        const etiquetas = []
        for (let i = 0; i < pedido?.medicamentos.length; i++) {
            const last = new Date(pedido?.medicamentos[i].periodo[pedido?.medicamentos[i].periodo.length - 1])
            console.log(last)
            for (let d = new Date(pedido?.medicamentos[i].periodo[0]); d <= last; d.setDate(d.getDate() + 1)) {
                console.log(d)
                for (let n = 0; n < pedido?.medicamentos[i].horarios.length; n++){
                    etiquetas.push(
                        <div className={style.etiquetaHorario}>
                            <div className={'col'}>
                                <div className={style.etiquetaHorarioHora}>{pedido.medicamentos[i].horarios[n]}</div>
                                <div className={style.etiquetaHorarioDia}>{ formatDate(d) }</div>
                            </div>
                            <br/>
                            <hr/>
                            <br/>
                            <div className={style.etiquetaHorarioContem}>CONTÉM:</div>
                            <div className={style.etiquetaHorarioConteudo}>{ pedido.medicamentos[i].quantidade_prescrita + ' ' + pedido.medicamentos[i].nome_medicamento + ' ' + pedido.medicamentos[i].concentracao}</div>
                        </div>
                    )
                }
            }
        }
        setEtiquetas(etiquetas)
    }

    return (
        <div>
            <div className={style.rowHorario}>
                { etiquetas }
            </div>
            <button onClick={async() => { window.print(); await updatePedidoImpressoes() }} className={'printButton'}>Imprimir</button>
            <button onClick={() => router.back()} className={'backButton'}>Voltar</button>
        </div>
    )
}