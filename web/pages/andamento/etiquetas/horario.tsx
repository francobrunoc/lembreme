import {DefaultLayout} from "../../../layouts/Default";
import style from "../../../styles/Etiquetas.module.css";
import Button from "../../../components/Button";
import VertLineComponent from "../../../components/etiquetas/VertLine";
import {useRouter} from "next/router";
import {store} from "../../../app/store";
import {useEffect, useState} from "react";
import pedidosService from "../../../services/pedidos";
import clientesService from "../../../services/clientes";

export default function EtiquetaHorarioPage() {
    const router = useRouter()
    const [cliente, setCliente] = useState(null)
    const [pedido, setPedido] = useState(null)

    useEffect(() => {
        const codigo: any = store.get('codigoPedido')
        pedidosService.find(codigo).then((pedido) => {
            setPedido(pedido)
            clientesService.find(pedido.CPF).then((cliente) => setCliente(cliente))
        })
    }, [])

    function visualizarImprimir() {
        store.set('pedido', pedido)
        store.set('cliente', cliente)
        router.push('/etiquetas/horario')
    }

    return (
        <DefaultLayout title={'Etiquetas horário'} nonav={true} spacing={false}>
            <div className={'row body__subtitle--text'}>
                Conferir e imprimir etiquetas.
            </div>
            <div className={'row body__subtitle--text'} style={{marginTop: '8vh'}}>
                <b>Informações da etiqueta:</b>
            </div>
            <div className={style.pane} style={{ height: '46vh' }}>
                <div className={'col start body__subtitle--text'} style={{width: '30vw'}}>
                    <b className={style.myFirst}>Horários:</b>
                    {
                        pedido?.medicamentos.map((medicamento, index) => <div key={index}>{ (index + 1) + ' - ' + medicamento.horarios.map((h) => h)}</div>)
                    }
                </div>
                <VertLineComponent/>
                <div className={'col start body__subtitle--text'} style={{ paddingLeft: '4.861vw'}}>
                    <b className={style.myFirst + ' row'}>Medicamentos:</b>
                    {
                        pedido?.medicamentos.map((medicamento, index) => <div  key={index} className={'row'}>{(index+1) + ' - ' + medicamento.nome_medicamento + ' ' + medicamento.concentracao}</div>)
                    }
                </div>
                <VertLineComponent/>
                <div className={'col start body__subtitle--text'} style={{ paddingLeft: '4.861vw'}}>
                    <b className={style.myFirst}>Informações adicionais:</b>
                    {/*<div>*/}
                    {/*    Dia*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    Noite*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    Refeição*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    Jejum*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    Ao deitar*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className={'row justify-space-evenly ' + style.footer}>
                <Button label={'Imprimir etiqueta'} type={'blue'} emit={() => visualizarImprimir()}/>
                <Button label={'Voltar'} type={'outlined'} emit={() => router.back()}/>
            </div>
        </DefaultLayout>
    )
}