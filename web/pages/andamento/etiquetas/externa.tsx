import {DefaultLayout} from "../../../layouts/Default";
import style from "../../../styles/Etiquetas.module.css";
import Button from "../../../components/Button";
import VertLineComponent from "../../../components/etiquetas/VertLine";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import pedidosService from '../../../services/pedidos'
import clientesService from '../../../services/clientes'
import {store} from "../../../app/store";
import farmaciasService from '../../../services/farmacias'
import formatDate from '../../../composables/formatDate'

export default function EtiquetaExternaPage() {
    const router = useRouter()
    const [cliente, setCliente] = useState(null)
    const [pedido, setPedido] = useState(null)
    const [farmacia, setFarmacia] = useState(null)

    useEffect(() => {
        const codigo: any = store.get('codigoPedido')
        pedidosService.find(codigo).then((pedido) => {
            setPedido(pedido)
            clientesService.find(pedido.CPF).then((cliente) => setCliente(cliente))
            farmaciasService.find('999999999').then((farmacia) => setFarmacia(farmacia))
            clientesService.find(pedido.CPF).then((cliente) => setCliente(cliente))
        })
    }, [])

   function visualizarImprimir() {
       store.set('pedido', pedido)
       store.set('cliente', cliente)
       store.set('farmacia', farmacia)
       router.push('/etiquetas/caixa')
    }

    return (
        <DefaultLayout title={'Etiqueta externa'} nonav={true} spacing={false}>
            <div className={'row body__subtitle--text'}>
                Conferir e imprimir etiqueta.
            </div>
            <div className={'row body__subtitle--text'} style={{marginTop: '8vh'}}>
                <b id={'teste'}>Informações da etiqueta:</b>
            </div>
            <div className={style.pane} style={{ height: '46vh' }}>
                <div className={'col start body__subtitle--text'}>
                    <b className={style.myFirst}>Nome do paciente:</b>
                    { cliente?.nome }
                    <b className={style.my}>Período de tratamento:</b>
                    { formatDate(pedido?.medicamentos[0].periodo[0]) + ' - ' + formatDate(pedido?.medicamentos[0].periodo[1]) }
                </div>
                <VertLineComponent/>
                <div className={'col start body__subtitle--text'} style={{paddingLeft: '4.861vw'}}>
                    <b className={style.myFirst + ' row'}>Medicamento:</b>
                    {
                        pedido?.medicamentos.map((medicamento, index) => <div key={index}> {(index + 1) + ' - ' + medicamento.nome_medicamento + ' - ' + medicamento.concentracao}</div>)
                    }
                    <b className={style.my + ' row'} style={{textAlign: 'start'}}>Quantidade de medicamento:</b>
                    <div>
                        {
                            pedido?.medicamentos.map((m, index) => <div key={index}> { (index + 1 + ' - ' + m.quantidade_prescrita) }</div>)
                        }
                    </div>
                    <b className={style.my}>Horários:</b>
                    {
                        pedido?.medicamentos.map((medicamento, index) => <div key={index}>{ (index + 1) + ' - ' + medicamento.horarios.map((h) => h)}</div>)
                    }
                </div>
                <VertLineComponent/>
                <div className={'col start body__subtitle--text'} style={{ paddingLeft: '4.861vw'}}>
                    <b className={style.myFirst}>Farmácia:</b>
                    <div style={{ textAlign: 'left' }}>
                        { farmacia?.endereco }
                    </div>
                    <b className={style.my} style={{textAlign: 'start'}}>Farmacêutico responsável:</b>
                    <div>
                        { farmacia?.responsavel }
                    </div>
                    <b className={style.my} style={{textAlign: 'start'}}>Inscrição Conselho Regional de Farmácia:</b>
                    <div>
                        { farmacia?.inscricao }
                    </div>
                </div>
            </div>
            <div className={'row justify-space-evenly ' + style.footer}>
                <Button label={'Imprimir etiqueta'} type={'blue'} emit={() => visualizarImprimir()}/>
                <Button label={'Voltar'} type={'outlined'} emit={() => router.back()}/>
            </div>
    </DefaultLayout>
    )
}