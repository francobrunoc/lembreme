import {DefaultLayout} from "../../layouts/Default";
import Dropdown from "../../components/todos/Dropdown";
import Text from "../../components/Text";

export default function RelatorioTodosPedidosPage() {
    return (
        <DefaultLayout title={'Todos os pedidos - Relatório'} spacing={false} next={'filtro'}>
            <div className={'row body__subtitle--text'}>
                Crie relatórios conforme tempo estipulado
            </div>
            <Dropdown label={'Selecionar período'}>
                <div className={'row body__subtitle--text justify-space-evenly'}>
                    <Text></Text>
                    até:
                    <Text style={{marginLeft: '1.875vw'}}></Text>
                </div>
            </Dropdown>
        </DefaultLayout>
    )
}