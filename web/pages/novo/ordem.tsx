import {DefaultLayout} from "../../layouts/Default";
import Button from "../../components/Button"
import Select from '../../components/Select'
import {store} from "../../app/store";
import Navigator from "../../components/Navigator";
import Message from "../../components/Message";
import {useState} from "react";

const save = (value) => store.save('medicamento', value)

export default function OrdemProducaoPage() {
    let [message, setMessage] = useState(null)
    const medicamento = {
        quantidade: null,
        atual: null,
        estoque: null,
        entregar: null
    }
    function setMedicamentosQtd(value) {
        medicamento.quantidade = Number(value)
        medicamento.atual = 0
        save(medicamento)
    }
    function setMedicamentoEmEstoque(value) {
        medicamento.estoque = value
        save(medicamento)
    }
    function setMedicamentoEntregar(value) {
        medicamento.entregar = value
        save(medicamento)
    }
    function validate() {
        if (medicamento.estoque !== null && medicamento.entregar !== null) return true
        else {
            setMessage('Selecione todas opções')
            return false
        }
    }
    return (
        <DefaultLayout title={'Ordem de produção'} nonav={true}>
            <div className={'row body__subtitle--text'} style={{ marginTop: 30 }}>
                O(s) medicamento(s) constam em estoque?
            </div>
            <div className={'row'}>
                <Button label={'Sim'} mr={'2.22vw'} emit={() => setMedicamentoEmEstoque(true)}/>
                <Button label={'Não'} emit={() => setMedicamentoEmEstoque(false)}/>
            </div>
            <div className={'row body__subtitle--text'} style={{ marginTop: 60 }}>
                Quantos medicamentos constam na receita?
            </div>
            <div className={'row'} style={{ marginBottom: 60 }}>
                <Select items={[1, 2, 3, 4, 5]} width={'34.444vw'} label={''} emit={(qtd) => setMedicamentosQtd(qtd)}/>
            </div>
            <div className={'row body__subtitle--text'}>
                Entregar medicamentos após finalização do pedido?
            </div>
            <div className={'row'}>
                <Button label={'Sim'} mr={'2.22vw'} emit={() => setMedicamentoEntregar(true)}/>
                <Button label={'Não'} emit={() => setMedicamentoEntregar(false)}/>
            </div>
            <Message message={message} show={message !== null} close={() => setMessage(null)} severity={'error'}/>
            <Navigator before={() => validate()} to={'/novo/medicamentos'}/>
        </DefaultLayout>
    )
}