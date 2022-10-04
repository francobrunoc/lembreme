import {DefaultLayout} from "../../layouts/Default";
import Text from '../../components/Text';
import Button from "../../components/Button";
import style from '../../styles/Todos.module.css'
import {useRouter} from "next/router";

export default function EnderecoPage() {
    const router = useRouter()
    const novo = true
    return (
        <DefaultLayout title={novo? 'Novo endereço':'Endereço cadastrado'} nonav={true} spacing={true}>
            <div className={'row'}>
                <Text label={'Endereço:'}></Text>
                <Text label={'Número:'}></Text>
                <Text label={'Complemento:'}></Text>
            </div>
            <div className={'row ' + style.mt}>
                <Text label={'Bairro:'}></Text>
                <Text label={'Cidade/Estado:'}></Text>
                <Text label={'CEP'}></Text>
            </div>
            <div className={'row ' + style.mt}>
                <Text label={'Ponto de referência:'}></Text>
                <Text label={'Telefone de contato:'}></Text>
            </div>
            <div className={'row justify-center'} style={{marginTop: '20.99vh'}}>
                <Button label={novo? 'Adicionar': 'Confirmar'} type={'colored'} mr={'3.472vw'}></Button>
                <div onClick={() => router.back()}>
                    <Button label={'Voltar'} type={'outlined'}></Button>
                </div>
            </div>
        </DefaultLayout>
    )
}