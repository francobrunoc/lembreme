import {DefaultLayout} from "../../../layouts/Default";
import style from "../../../styles/Etiquetas.module.css";
import Button from "../../../components/Button";
import VertLineComponent from "../../../components/etiquetas/VertLine";
import {useRouter} from "next/router";
import {store} from "../../../app/store";
import {useEffect, useState} from "react";
import pedidosService from "../../../services/pedidos";
import clientesService from "../../../services/clientes";

export default function EtiquetaMedicamentoPage() {
    const router = useRouter()
    const [cliente, setCliente] = useState(null)
    const [pedido, setPedido] = useState(null)

    useEffect(() => {
        pedidosService.find(store.get('codigoPedido')).then((pedido) => {
            setPedido(pedido)
            clientesService.find(pedido.CPF).then((cliente) => setCliente(cliente))
        })
    }, [])

    function visualizarImprimir() {
        store.set('pedido', pedido)
        store.set('cliente', cliente)
        router.push('/etiquetas/medicamento')
    }

    return (
        <DefaultLayout title={'Etiquetas medicamento'} nonav={true} spacing={false}>
            <div className={'row body__subtitle--text'}>
                Conferir e imprimir etiquetas.
            </div>
            <div className={'row body__subtitle--text'} style={{marginTop: '8vh'}}>
                <b>Informações da etiqueta:</b>
            </div>
            <div className={style.pane} style={{height: '46vh'}}>
                <div className={'col start body__subtitle--text'} style={{width: '31.25vw'}}>
                    <b className={style.my}>Medicamentos:</b>
                    {
                        pedido?.medicamentos.map((medicamento, index) => <div key={index} className={'row'}>{(index+1) + ' - ' + medicamento.nome_medicamento + ' ' + medicamento.concentracao}</div>)
                    }
                </div>
                <VertLineComponent/>
                <div className={'col start body__subtitle--text'} style={{paddingLeft: '3.472vw', width: '41.667vw'}}>
                    <b className={style.my + ' row'}>Fabricantes/Lote/Validade:</b>
                    {
                        pedido?.medicamentos.map((m, i) => <div key={i}>{(i+1) + ' - ' + m.laboratorio + ' / ' + m.lote + ' / ' + m.validade}</div>)
                    }
                </div>
                <VertLineComponent/>
                <div className={'col start body__subtitle--text'} style={{paddingLeft: '3.472vw'}}>
                    <b className={style.my}>Via de administração:</b>
                    {
                        pedido?.medicamentos.map((m, i) => <div key={i}>{(i + 1) + ' - ' + m.administracao}</div>)
                    }
                </div>
            </div>
            <div className={'row justify-space-evenly ' + style.footer}>
                <Button label={'Imprimir etiqueta'} type={'blue'} emit={() => visualizarImprimir()}/>
                <Button label={'Voltar'} type={'outlined'} emit={() => router.back()}/>
            </div>
        </DefaultLayout>
    )
}