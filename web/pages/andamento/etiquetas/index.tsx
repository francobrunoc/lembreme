import {DefaultLayout} from "../../../layouts/Default";
import Text from '../../../components/Text'
import style from '../../../styles/Etiquetas.module.css'
import {useRouter} from "next/router";
import {store} from "../../../app/store";
import {useEffect, useState} from "react";
import pedidosService from "../../../services/pedidos";

export default function GerarEtiquetas() {
    const router = useRouter()
    const [pedido, setPedido] = useState(null)
    const [codigo, setCodigo] = useState(null)

    useEffect(() => {
        pedidosService.find(store.get('codigoPedido')).then((pedido) => {
            setPedido(pedido)
            setCodigo(pedido.codigo)
        })
    }, [])

    return (
        <DefaultLayout title={'Gerar etiquetas'} nonav={true} spacing={false}>
            <div className={'row body__subtitle--text'}>
                Conferir e imprimir etiquetas.
            </div>
            <Text label={'Número do pedido'} width={252} spacing={69} value={codigo}/>
            <div className={'justify-space-evenly ' + style.buttonsBar}>
                <img src={'/etiquetas/etiqueta_externa.svg'} className={pedido?.impressao[0]? style.button: style.button + ' ' + style.notPrinted} onClick={() => router.push('/andamento/etiquetas/externa')}/>
                <img src={'/etiquetas/etiquetas_horario.svg'} className={pedido?.impressao[1]? style.button: style.button + ' ' + style.notPrinted} onClick={() => router.push('/andamento/etiquetas/horario')}/>
                <img src={'/etiquetas/etiquetas_medicamento.svg'} className={pedido?.impressao[2]? style.button: style.button + ' ' + style.notPrinted} onClick={() => router.push('/andamento/etiquetas/medicamento')}/>
            </div>
        </DefaultLayout>
    )
}