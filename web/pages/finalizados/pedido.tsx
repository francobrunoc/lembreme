import {DefaultLayout} from "../../layouts/Default";
import Text from "../../components/Text";
import Dropdown from "../../components/todos/Dropdown";
import Button from "../../components/Button";
import Link from "next/link";

export default function PedidoFinalizadoPage() {
    return (
        <DefaultLayout title={'Pedidos finalizados'} nonav={true}>
            <div style={{marginTop: 60}}></div>
            <div className={'row'}>
                <Text label={'Número do pedido:'} value={42198}></Text>
                <Text label={'Disponível desde:'} value={'xx/xx/xxxx'}></Text>
                <Text label={'Data de entrega prevista:'} value={'xx/xx/xxxx'}></Text>
                <Text label={'Entrega'} value={'Cliente irá retirar'}></Text>
            </div>
            <Link href={'/finalizados/alterarEntrega'}>
                <div className={'row justify-end'} style={{textDecoration: 'underline', paddingRight: 40}}>
                    Alterar
                </div>
            </Link>
            <div className={'scroller'} style={{height: 400}}>
                <Dropdown label={'Dados do cliente'}>
                    <div className={'row'}>
                        <Text label={'Nome completo:'}></Text>
                        <Text label={'CPF:'}></Text>
                        <Text label={'Telefone:'}></Text>
                    </div>
                </Dropdown>
                <Dropdown label={'Prescrição'}>
                    <Text label={'Prescrição'}></Text>
                </Dropdown>
                <Dropdown label={'Dados medicamento:'}>
                    <Text label={'Prescrição'}></Text>
                </Dropdown>
            </div>
            <div style={{marginTop: 50}}></div>
            <div className={'row justify-center'}>
                <Button label={'Voltar'} type={'colored'}></Button>
            </div>
        </DefaultLayout>
    )
}