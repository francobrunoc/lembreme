import {DefaultLayout} from "../../layouts/Default";
import Dropdown from "../../components/todos/Dropdown";
import Button from "../../components/Button";
import style from '../../styles/Todos.module.css';
import Text from "../../components/Text";
import {useRouter} from "next/router";

export default function LocalizarPedidoEspecificoPage() {
    const CPF: string = ''
    const pedido: number = null
    const router = useRouter()
    return (
        <DefaultLayout title={'Todos os pedidos - Pedido específico'} nonav={true}>
            <div className={'row body__subtitle--text'}>Como deseja localizar o pedido?</div>
            <Dropdown label={'CPF do cliente'}>
                <Text placeholder={'Informe o CPF'} width={'36.806vw'} mr={'3.472vw'} value={CPF}/>
            </Dropdown>
            <Dropdown label={'Número do pedido'}>
                <Text placeholder={'Informe o pedido'} width={'36.806vw'} mr={'3.472vw'} value={pedido}/>
            </Dropdown>
            <div className={style.buttonFooter} onClick={() => router.push('/todos/pedido')}>
                <Button label={'Localizar'} type={'colored'}></Button>
            </div>
        </DefaultLayout>
    )
}