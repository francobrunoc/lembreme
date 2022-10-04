import {DefaultCenteredLayout} from "../../../layouts/DefaultCenteredLayout";
import Button from "../../../components/Button";
import { useRouter } from 'next/router'
import {store} from "../../../app/store";
import {useEffect, useState} from "react";
import pedidosService from '../../../services/pedidos'
import Message from "../../../components/Message";

export default function PedidoEnviadoSeparacaoPage() {
    const router = useRouter()
    let codigoPedido = null
    let [message, setMessage] = useState(null)

    useEffect(() => {
        codigoPedido = store.get('codigoPedido')
        const pedido = store.get('pedido')
        pedidosService.update(pedido).then((res) => {
            if (res) setMessage('Pedido alterado com sucesso!')
            else setMessage('Ops! Ocorreu um erro ao alterar o pedido no banco de dados!')
        }).catch((e) => console.log(e))
    }, [])

    return (
        <DefaultCenteredLayout>
            <img src={'/pedido/check_outlined.svg'} style={{marginBottom: '5.25vh', width: '8.194vw', height: '12.38vh'}}/>
            <div className="row justify-center body__title--text" style={{marginBottom: '3.15vh'}}>Pedido { codigoPedido } enviado para separação</div>
            <div className="col justify-center body__subtitle--text">O pedido estará disponível no menu principal: pedidos em andamento</div>
            <div className={'row justify-center'} style={{marginTop: '17vh'}} onClick={() => router.push('/')}>
                <Button type={'colored'} label={'Tela inicial'} />
            </div>
            <Message message={message} show={message !== null} close={() => setMessage(null)} severity={'success'}/>
        </DefaultCenteredLayout>
    )
}