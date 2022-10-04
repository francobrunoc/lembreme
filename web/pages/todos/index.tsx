import {DefaultLayout} from "../../layouts/Default";
import style from '../../styles/Todos.module.css';
import Link from "next/link";

export default function TodosPedidosPage() {
    return (
        <DefaultLayout title={'Todos os pedidos'}>
            <div className={'row body__subtitle--text'}>
                Nessa seção, você consegue obter informações de todos os pedidos realizados.
            </div>
            <div className={'row justify-center'} style={{marginTop: '16.79vh'}}>
                <Link href={'/todos/localizar'}>
                    <div className={'col center'}>
                        <img src={'/pedido/pedido_especifico.svg'} className={style.iconsSize}/>
                        <div className={'body__title--text ' + style.my}>Pedido específico</div>
                        <div className={'body__subtitle--text'}>Deseja consultar um pedido específico? Clique aqui</div>
                    </div>
                </Link>
                <Link href={'/todos/relatorio'}>
                    <div className={'col center'}>
                        <img src={'/pedido/relatorio.svg'}  className={style.iconsSize}/>
                        <div className={'body__title--text ' + style.my}>Relatório</div>
                        <div className={'body__subtitle--text'}>Obtenha relatórios semanais, mensais, semestrais e anuais.</div>
                    </div>
                </Link>
            </div>
        </DefaultLayout>
    )
}