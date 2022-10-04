import {DefaultLayout} from "../../layouts/Default";
import ListOptions from "../../components/ListOptions";
import {useEffect, useState} from "react";
import pedidosService from '../../services/pedidos'
import {store} from "../../app/store";
import {useRouter} from "next/router";


export default function PedidosAndamentoPage() {
    const router = useRouter()
    const [conferencia, setConferencia] = useState([])
    const [confirmados, setConfirmados] = useState([])
    const [liberados, setLiberados] = useState([])

    useEffect(() => {
          pedidosService.list(null).then((pedidos) => {
              setConferencia(pedidos.filter((pedido) => pedido.situacao === 'C' || pedido.situacao === 'CS'))
              setConfirmados(pedidos.filter((pedido) => pedido.situacao === 'S'))
              setLiberados(pedidos.filter((pedido) => pedido.situacao === 'E'))
          })
    }, [])

    function submitConferencia(pedido) {
        store.set('codigoPedido', pedido.codigo)
        if (pedido.situacao === 'C') store.set('page', 'conferencia')
        if (pedido.situacao === 'CS') store.set('page', 'separacao')
        router.push('/andamento/acesso')
    }

    function submitSeparacao(pedido) {
        store.set('codigoPedido', pedido.codigo)
        store.set('page', 'separacao')
        router.push('/andamento/acesso')
    }

    function submitLiberados(pedido) {
        store.set('codigoPedido', pedido.codigo)
        store.set('page', 'etiquetas')
        router.push('/andamento/acesso')
    }

    return (
        <DefaultLayout title={false} nonav={true}>
            <div className={'row body__title--text'}>Pedidos aguardando conferência</div>
            <div className={'row body__subtitle--text'}>Clique sobre o pedido para conferí-lo.</div>
            <ListOptions items={conferencia} height={'18vh'} width={'46.667vw'} emit={(pedido) => submitConferencia(pedido) }/>
            <div className={'row body__title--text'} style={{marginTop: '4.2vh'}}>Pedidos confirmados</div>
            <div className={'row body__subtitle--text'}>Clique sobre o pedido para dar andamento na produção.</div>
            <ListOptions items={confirmados} height={'18vh'} width={'46.667vw'} emit={(pedido) => submitSeparacao(pedido)}/>
            <div className={'row body__title--text'} style={{marginTop: '4.2vh'}}>Etiquetas - Pedidos liberados</div>
            <div className={'row body__subtitle--text'}>Clique sobre o pedido para dar gerar as etiquetas e unitarizar os medicamentos.</div>
            <ListOptions items={liberados} height={'8.39vh'} width={'46.667vw'} emit={(pedido) => submitLiberados(pedido)}/>
        </DefaultLayout>
    )
}