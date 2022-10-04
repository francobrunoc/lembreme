import {DefaultLayout} from "../../../layouts/Default";
import Text from '../../../components/Text'
import Button from "../../../components/Button";
import style from "../../../styles/Conferencia.module.css"
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {store} from "../../../app/store";
import pedidosService from '../../../services/pedidos'
import Input from "../../../components/Input";

export default function ConferenciaPage() {
    const router = useRouter()

    const [medicamentos, setMedicamentos] = useState([])
    const [medicamento, setMedicamento] = useState(0)
    const [dataConferencia, setDataConferencia] = useState(null)
    const [error, setError] = useState(null)
    const [codigo, setCodigo] = useState(null)

    useEffect(() => {
        if (!store.get('usuario')) router.push('/andamento/acesso/bloqueado')

        pedidosService.find(store.get('codigoPedido')).then((pedido) => {
            store.set('pedido', pedido)
            setMedicamentos(pedido.medicamentos)
            setCodigo(pedido.codigo)
        })

        if (store.get('medicamento_position')) {
            setMedicamento(store.get('medicamento_position'))
            store.remove('medicamento_position')
        }
    }, [])

    function mergeDataConferencia() {
        medicamentos[medicamento].data_conferencia = dataConferencia
    }

    async function submit() {
        if (medicamento < medicamentos.length -1) {
            if (!dataConferencia) {
                setError(true)
                return
            } else setError(null)
            mergeDataConferencia()
            setMedicamento(medicamento + 1)
        }
        else {
            mergeDataConferencia()
            const pedido = store.get('pedido')
            pedido.medicamentos = medicamentos
            pedido.situacao = 'S'
            store.set('pedido', pedido)
            router.push('/andamento/separacao/enviado')
        }
    }

    function corrigir() {
        store.set('medicamento', medicamentos[medicamento])
        store.set('medicamento_position', medicamento)
        router.push('/andamento/conferencia/corrigir')
    }

    return (
        <DefaultLayout nonav={true} title={'Conferir pedido'}>
            <div className={'row ' + style.my}>
                <Text label={'Numero do pedido:'} value={codigo}/>
                <Text label={'Nome do medicamento:'} value={medicamentos[medicamento]?.nome_medicamento}/>
                <Text label={'Concentração:'} value={medicamentos[medicamento]?.concentracao}/>
            </div>
            <div className={'row'}>
                <Text label={'Horários:'} value={medicamentos[medicamento]?.horarios}/>
                <Text label={'Nome prescritor:'} value={medicamentos[medicamento]?.nome_prescritor}/>
                <Text label={'Número conselho:'} value={medicamentos[medicamento]?.numero_conselho}/>
            </div>
            <div className={'row ' + style.my}>
                <Text label={'Data prescrição:'} value={medicamentos[medicamento]?.data_prescricao}/>
                <Text label={'Quantidade prescrita:'} value={medicamentos[medicamento]?.quantidade_prescrita}/>
                <Input label={'Data da conferência:'} mask={'99/99/9999'} value={medicamentos[medicamento]?.data_conferencia} emit={(v) => setDataConferencia(v)} error={error}/>
            </div>
            <div className={'footer ' + style.buttons}>
                <div className={'row justify-center'}>
                    <Button label={'Confirmar'} type={'colored'} mr={'3.542vw'} emit={async() => submit()}/>
                    <Button label={'Corrigir'} type={'outlined'} emit={() => corrigir()}/>
                </div>
            </div>
        </DefaultLayout>
    )
}