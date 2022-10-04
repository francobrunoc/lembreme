import {DefaultLayout} from "../../layouts/Default";
import Text from '../../components/Text'
import Button from "../../components/Button";
import List from '../../components/todos/List';

export default function FiltroRelatoriosTodosPedidosPage() {
    const filtered = [{ value: 42198, situacao: 'Entregue'}, { value: 49732, situacao: 'Entregue'}, { value: 49733, situacao: 'Finalizado'}]
    return (
        <DefaultLayout title={'Todos os pedidos - Relatório'} nonav={true}>
            <div className={'row body__subtitle--text'}>Crie relatórios conforme tempo estipulado</div>
            <div style={{marginTop: '6.61vh'}}></div>
            <div className={'row'}>
                <Text label={'Pedidos da semana:'}></Text>
                <Text label={'Número de pedidos:'}></Text>
            </div>
            <div style={{marginTop: '4.2vh'}}></div>
            <List items={filtered} width={'70.972vw'} height={'100%'}></List>
            <div style={{marginTop: '16.16vh'}}></div>
            <div className={'row justify-center'}>
                <Button label={'Imprimir relatório'} type={'colored'}></Button>
                <div style={{width: '3.472vw'}}></div>
                <Button label={'Voltar'} type={'outlined'}></Button>
            </div>
        </DefaultLayout>
    )
}