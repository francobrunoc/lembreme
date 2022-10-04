import {DefaultLayout} from "../../layouts/Default";
import Text from '../../components/Text';
import Dropdown from "../../components/todos/Dropdown";
import style from "../../styles/Todos.module.css";
import Button from "../../components/Button";
import {useRouter} from "next/router";

export default function PedidoEspecificoPage() {
    const router = useRouter()
    return (
        <DefaultLayout title={'Todos os pedidos - Pedido específico'} nonav={true}>
            <div className={'row ' + style.my}>
                <Text label={'Número do pedido:'} value={48271}></Text>
                <Text label={'Situação do pedido:'} value={'Aguardando embalar'}></Text>
            </div>
            <div className={'scroller'} style={{height: '50.37vh'}}>
                <Dropdown label={'Dados do cliente'}>
                    <Text></Text>
                </Dropdown>
                <Dropdown label={'Prescrição'}>
                    <Text></Text>
                </Dropdown>
                <Dropdown label={'Dados medicamento'}>
                    <Text></Text>
                </Dropdown>
                <div className={style.buttonFooter} onClick={() => router.back()}>
                    <Button label={'Voltar'} type={'colored'}></Button>
                </div>
            </div>
        </DefaultLayout>
    )
}