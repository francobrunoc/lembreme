import {DefaultCenteredLayout} from "../../../layouts/DefaultCenteredLayout";
import Button from "../../../components/Button";
import { useRouter } from 'next/router'

export default function PedidoProntoUnitarizarPage() {
    const router = useRouter()
    return (
        <DefaultCenteredLayout>
            <img src={'/pedido/medicamentos.svg'} style={{marginBottom: '5.25vh', width: '8.194vw', height: '12.38vh'}}/>
            <div className="row justify-center body__title--text" style={{marginBottom: '3.15vh'}}>Pedido 42198 pronto para unitarizar</div>
            <div className="col justify-center body__subtitle--text">Após finalizar a unitarização, clique no botão finalizar para enviar para conferência.</div>
            <div className={'row justify-center'} style={{marginTop: '17vh'}} onClick={() => router.push('home')}>
                <Button type={'colored'} label={'FInalizar'} to={'finalizar'}/>
            </div>
        </DefaultCenteredLayout>
    )
}