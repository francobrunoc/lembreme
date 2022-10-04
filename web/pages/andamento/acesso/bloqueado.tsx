import {DefaultCenteredLayout} from "../../../layouts/DefaultCenteredLayout";
import Button from "../../../components/Button";
import style from '../../../styles/Acesso.module.css'
import {useRouter} from "next/router";
import {store} from "../../../app/store";

export default function AcessoNegadoPage() {
    const router = useRouter()
    return (
        <DefaultCenteredLayout navigator={false}>
            <img src={'/acesso/negado.svg'} />
            <div className={'body__title--text ' + style.titleMy}>Usuário sem permissão</div>
            <div className={'body__subtitle--text ' + style.subtitleMb}>Você não tem autorização para acessar o pedido.</div>
            <div onClick={() => router.push('/andamento')}>
                <Button type={'colored'} label={'Tela inicial'}/>
            </div>
        </DefaultCenteredLayout>
    )
}