import {DefaultCenteredLayout} from "../../../layouts/DefaultCenteredLayout";
import Button from "../../../components/Button";
import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import Message from "../../../components/Message";
import {store} from "../../../app/store";
import pedidosService from "../../../services/pedidos";

export default function PedidoEnviadoConferenciaPage() {
    const router = useRouter()
    let [message, setMessage] = useState(null)

    useEffect(() => {
        const pedido = store.get('pedido')
        pedidosService.update(pedido).then((res) => {
            if (res) setMessage('Pedido alterado com sucesso!')
            else setMessage('Ops! Ocorreu um erro ao alterar o pedido no banco de dados!')
        }).catch((e) => console.log(e))
    }, [])

    return (
        <DefaultCenteredLayout>
            <img src={'/pedido/check_outlined.svg'} style={{marginBottom: '5.25vh', width: '8.194vw', height: '12.38vh'}}/>
            <div className="row justify-center body__title--text" style={{marginBottom: '3.15vh'}}>Pedido enviado para conferência</div>
            <div className="col justify-center body__subtitle--text">Após conferência, o pedido estará disponível no menu principal: pedidos em andamento.</div>
            <div className={'row justify-center'} style={{marginTop: '17vh'}} onClick={() => router.push('/')}>
                <Button type={'colored'} label={'Tela inicial'}/>
            </div>
            <Message message={message} show={message !== null} close={() => setMessage(null)} severity={'success'}/>
        </DefaultCenteredLayout>
    )
}