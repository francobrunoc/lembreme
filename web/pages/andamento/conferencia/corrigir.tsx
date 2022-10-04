import {DefaultLayout} from "../../../layouts/Default";
import Input from '../../../components/Input'
import Button from "../../../components/Button";
import style from "../../../styles/Conferencia.module.css"
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {store} from "../../../app/store";
import Text from "../../../components/Text";
import pedidosService from "../../../services/pedidos";

export default function CorrigirMedicamentoPage() {
    const router = useRouter()

    const [medicamento, setMedicamento] = useState(null)
    let codigoPedido = null

    useEffect(() => {
        if (!store.get('usuario')) router.push('/andamento/acesso/bloqueado')
        codigoPedido = store.get('codigoPedido')
        setMedicamento(store.get('medicamento'))
    }, [])

    async function submit() {
        const pedido = store.get('pedido')
        pedido.medicamentos[store.get('medicamento_position')] = medicamento
        await pedidosService.update(pedido)
        router.back()
    }

    return (
        <DefaultLayout nonav={true} title={'Conferir pedido'}>
            <div className={'row ' + style.my}>
                <Text label={'Numero do pedido:'} value={codigoPedido}/>
                <Input label={'Nome do medicamento:'} value={medicamento?.nome_medicamento} emit={(value) => setMedicamento({...medicamento, nome_medicamento: value })}/>
                <Input label={'Concentração:'} value={medicamento?.concentracao} emit={(value) => setMedicamento({...medicamento, concentracao: value })}/>
            </div>
            <div className={'row'}>
                <Input label={'Posologia:'} value={medicamento?.posologia} emit={(value) => setMedicamento({...medicamento, posologia: value })}/>
                <Input label={'Nome prescritor:'} value={medicamento?.nome_prescritor} emit={(value) => setMedicamento({...medicamento, nome_prescritor: value })}/>
                <Input label={'Número conselho:'} value={medicamento?.numero_conselho} emit={(value) => setMedicamento({...medicamento, numero_conselho: value })}/>
            </div>
            <div className={'row ' + style.my}>
                <Input label={'Data prescrição:'} value={medicamento?.data_prescricao} emit={(value) => setMedicamento({...medicamento, data_prescricao: value })}/>
                <Input label={'Quantidade prescrita:'} value={medicamento?.quantidade_prescrita} emit={(value) => setMedicamento({...medicamento, quantidade_prescrita: value })}/>
            </div>
            <div className={'footer ' + style.buttons}>
                <div className={'row justify-center'}>
                    <Button label={'Confirmar'} type={'colored'} mr={'3.542vw'} emit={async() => submit()}/>
                </div>
            </div>
        </DefaultLayout>
    )
}
