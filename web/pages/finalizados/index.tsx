import {DefaultLayout} from "../../layouts/Default";
import ListOptions from "../../components/ListOptions";

export default function PedidosFinalizadosPage() {
    const finalizados = [45321, 42198, 49732, 49733]
    return (
        <DefaultLayout title={'Pedidos finalizados'} next={'/finalizados/pedido'}>
            <div className={'row body__subtitle--text'}>Clique sobre o pedido para obter mais informações.</div>
            <div style={{marginBottom: 25}} />
            <ListOptions items={finalizados} height={365} width={'46.667vw'}></ListOptions>
        </DefaultLayout>
    )
}