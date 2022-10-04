import {DefaultCenteredLayout} from "../../layouts/DefaultCenteredLayout";
import Navigator from "../../components/Navigator";
import style from '../../styles/Estoque.module.css'

export default function EstoquePage() {
    return (
        <DefaultCenteredLayout navigator={true}>
            <img src={'/estoque/box_check.svg'} className={style.logoSizeMargin} />
            <div className={"row justify-center body__title--text " + style.titleMb} >Estoque</div>
            <div className="col justify-center body__subtitle--text">Antes de iniciar a solicitação, consulte
                no Retaguarda a disponibilidade dos medicamentos que constam na receita.</div>
            <Navigator to={'ordem'} />
        </DefaultCenteredLayout>
    )
}