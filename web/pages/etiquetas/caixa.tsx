import style from '../../styles/Etiquetas.module.css'
import {store} from "../../app/store";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import pedidosService from "../../services/pedidos";
import formatDate from '../../composables/formatDate'

export default function EtiquetaCaixa() {
    const router = useRouter()
    const [pedido, setPedido] = useState(null)
    const [cliente, setCliente] = useState(null)
    const [farmacia, setFarmacia] = useState(null)

    useEffect(() => {
        setPedido(store.get('pedido'))
        setCliente(store.get('cliente'))
        setFarmacia(store.get('farmacia'))
    },[])

    async function updatePedidoImpressoes() {
        pedido.impressao? pedido.impressao[0] = true: pedido.impressao = [true, false, false]
        await pedidosService.update(pedido)
    }

    return (
        <div className={style.etiquetaCaixa} id={'etiqueta'}>
            <div className={'row justify-center'}>
                <img src={'/etiquetas/etiqueta_caixa_lembreme_logo.svg'} style={{ marginTop: 68, marginBottom: 46 }}/>
            </div>
            <div className={style.etiquetaCaixaInfos}>
                <div className={style.etiquetaCaixaPacienteLabel}>NOME DO PACIENTE:</div>
                <div className={style.etiquetaCaixaPacienteValue}>{ cliente?.nome }</div>
                <div className={style.etiquetaCaixaPacienteLabel}>PERÍODO DE TRATAMENTO:</div>
                <div className={style.etiquetaCaixaPacienteValue}>{ formatDate(pedido?.medicamentos[0].periodo[0]) + ' - ' + formatDate(pedido?.medicamentos[0].periodo[1]) }</div>
                <hr/>
                <div className={'row'}>
                    <div className={'col'} style={{ marginRight: 20 }}>
                        <div className={style.etiquetaCaixaMedicamentosLabel}>MEDICAMENTOS:</div>
                        {
                            pedido?.medicamentos.map((m, i) => <div key={i} className={style.etiquetaCaixaMedicamentosValue}>{ m.nome_medicamento + ' ' + m.concentracao }</div>)
                        }
                        <div className={style.etiquetaCaixaMedicamentosLabel}>POSOLOGIA:</div>
                        {
                            pedido?.medicamentos.map((m, i) => <div key={i} className={style.etiquetaCaixaMedicamentosValue}>{ m.posologia }</div>)
                        }
                    </div>
                    <div className={'col'}>
                        <div className={style.etiquetaCaixaMedicamentosLabel}>QUANTIDADE DE MEDICAMENTOS:</div>
                        <div className={style.etiquetaCaixaMedicamentosValue}>{ pedido?.medicamentos.length}</div>
                        <div className={style.etiquetaCaixaMedicamentosLabel}>FARMACÊUTlCO RESPONSÁVEL:</div>
                        <div className={style.etiquetaCaixaMedicamentosValue}>{ farmacia?.responsavel }</div>
                        <div className={style.etiquetaCaixaMedicamentosLabel}>CRF: { farmacia?.inscricao }</div>
                    </div>
                </div>
            </div>
            <div className={'row justify-center'} style={{marginTop: 27}}>
                <div className={'col'}>
                    <img src={'/etiquetas/etiqueta_caixa_dc_logo.svg'}/>
                </div>
                <div className={'col'} style={{marginLeft: 33}}>
                    <div className={style.etiquetaCaixaFaleConoscoLabel}>FALE CONOSCO</div>
                    <div className={style.etiquetaCaixaFaleConoscoValue}>{ farmacia?.endereco }</div>
                </div>
            </div>
            <button onClick={async() => { window.print(); await updatePedidoImpressoes() }} className={'printButton'}>Imprimir</button>
            <button onClick={() => router.back()} className={'backButton'}>Voltar</button>
        </div>
    )
}