import {DefaultLayout} from "../../layouts/Default";
import Text from "../../components/Text";
import Button from "../../components/Button";
import {useRouter} from "next/router";

export default function AlterarEntregaPage() {
    const router = useRouter()
    return (
        <DefaultLayout title={'Alterar entrega'} nonav={true}>
            <div className={'row'}>
                <Text label={'Número do pedido:'} value={42198}></Text>
                <Text label={'Disponível desde:'} value={'xx/xx/xxxx'}></Text>
                <Text label={'Data de entrega prevista:'} value={'xx/xx/xxxx'}></Text>
                <Text label={'Entrega'} value={'Cliente irá retirar'}></Text>
            </div>
            <div style={{marginTop: '13.43vh'}}></div>
            <div className={'row body__subtitle--text'}>
                <b>Alterar para:</b>
            </div>
            <div style={{marginTop: '5.25vh'}}></div>
            <div className={'row justify-center'}>
                <img src={'/pedido/endereco_cadastrado.svg'} />
                <div style={{width: '5.556vw'}}></div>
                <img src={'/pedido/novo_endereco.svg'} onClick={() => router.push('/novo/clientes/registro')}/>
            </div>
            <div style={{marginTop: '11.75vh'}}></div>
            <div className={'row justify-center'} onClick={() => router.back()}>
                <Button type={'colored'} label={'Voltar'}></Button>
            </div>
        </DefaultLayout>
    )
}