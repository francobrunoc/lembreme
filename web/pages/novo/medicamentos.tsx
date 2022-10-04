import {DefaultLayout} from "../../layouts/Default";
import Input from "../../components/Input";
import Select from '../../components/Select'
import Navigator from "../../components/Navigator";
import styles from '../../styles/Medicamento.module.css';
import {store} from "../../app/store";
import {useEffect, useRef, useState} from "react";
import {IMedicamento} from "../../app/interface/IMedicamento";
import { MultiSelect } from "react-multi-select-component";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import formatDate from "../../composables/formatDate";

export default function MedicamentoPage() {
    const [current, setCurrent] = useState(null)
    const [error, setError] = useState([])
    const [medicamentos] = useState([])
    const [horarios, setHorarios] = useState([]);
    const [period, setPeriod] = useState(null);
    const _horarios = [{label: '00:00', value: '00:00'}, {label: '01:00', value: '01:00'}, {label: '02:00', value: '02:00'}, {label: '03:00', value: '03:00'}, {label: '04:00', value: '04:00'}, {label: '05:00', value: '05:00'}, {label: '06:00', value: '06:00'}, {label: '07:00', value: '07:00'}, {label: '08:00', value: '08:00'}, {label: '09:00', value: '09:00'}, {label: '10:00', value: '10:00'}, {label: '11:00', value: '11:00'}, {label: '12:00', value: '12:00'}, {label: '13:00', value: '13:00'}, {label: '14:00', value: '14:00'}, {label: '15:00', value: '15:00'}, {label: '16:00', value: '16:00'}, {label: '17:00', value: '17:00'}, {label: '18:00', value: '18:00'}, {label: '19:00', value: '19:00'}, {label: '20:00', value: '20:00'}, {label: '21:00', value: '21:00'}, {label: '22:00', value: '22:00'}, {label: '23:00', value: '23:00'}]
    const calendar = useRef(null)
    const tipoMedicamento = ['Selecione', 'Comprimido', 'Cápsula']
    const _vezesAo = ['Selecione', 'Dia', 'Semana', 'Mês']
    const administracaoVia = ['Selecione', 'Oral', 'Tópica']
    let collapsed = false

    let [medicamento, setMedicamento] = useState<IMedicamento>({
        concentracao: "",
        data_entrega: "",
        data_prescricao: "",
        nome_medicamento: "",
        nome_prescritor: "",
        numero_conselho: "",
        numero_documento: "",
        periodo: "",
        quantidade_prescrita: "",
        horarios: [],
        posologia: ['', '', '', ''],
        administracao: ""
    })

    useEffect(() => {
        setCurrent(store.get('medicamento').atual + 1)
    }, [])

    function invalids() {
        const invalids = []
        Object.entries(medicamento).forEach((c) => {
            if (c[1] instanceof Array) {
                if (c[0] === 'posologia' && (!c[1][0] || !c[1][1] || !c[1][2] || !c[1][3])) {
                    invalids.push('posologia')
                }
                if (horarios.length === 0) invalids.push('horarios')
            }
            else if (!c[1] && !(c[1] instanceof Array)) invalids.push(c[0])
        })
        console.log(invalids)
        return invalids
    }

    function reset() {
        Object.keys(medicamento).forEach((key) => {
            medicamento[key] = ''
        })
        setHorarios([])
        setPeriod(null)
        medicamento.periodo = null
        medicamento.horarios = []
        medicamento.posologia = ['', '', '', '']
    }

    async function update() {
        if (!invalids().length) {
            const total = store.get('medicamento').quantidade
            medicamento.horarios = horarios.map(({value}) => value)
            medicamentos.push({...medicamento})
            store.save('medicamento', { atual: current })
            if (current < total) {
                setCurrent(current + 1)
                reset()
                setError([])
            }
            else {
                store.set('medicamentos', medicamentos)
                return true
            }
        } else {
            setError(invalids())
            return false
        }
    }

    const toggle = () => {
        if (collapsed) {
            calendar.current.style.maxHeight = 0
        }
        else {
            calendar.current.style.maxHeight = calendar.current.scrollHeight + 'px'
        }
        collapsed = !collapsed
    }

    return (
        <DefaultLayout title={'Ordem de produção - Medicamento ' + current} nonav={true} spacing={true}>
            <div className={'row'}>
                <Input label={'Nome do medicamento:'} width={529} emit={(v) => setMedicamento({...medicamento, nome_medicamento: v})} value={medicamento.nome_medicamento}  error={error?.includes('nome_medicamento')}/>
                <Input label={'Concentração:'} emit={(v) => setMedicamento({...medicamento, concentracao: v})} value={medicamento.concentracao} width={252} error={error?.includes('concentracao')}/>
                <Input label={'Quantidade prescrita:'} emit={(v) => setMedicamento({...medicamento, quantidade_prescrita: v})} value={medicamento.quantidade_prescrita} width={529} error={error?.includes('quantidade_prescrita')}/>
            </div>
            <div className={'row'} style={{marginTop: '2.52vh'}}>
                <Input label={'QTD'} emit={(v) => { medicamento.posologia[0] = v; setMedicamento({...medicamento, posologia: medicamento.posologia})}} mask={'999'} value={medicamento.posologia[0]} width={87} error={error?.includes('posologia')}/>
                <Select label={'Tipo'} emit={(v) => { medicamento.posologia[1] = v; setMedicamento({...medicamento, posologia: medicamento.posologia})}} value={medicamento.posologia[1]} items={tipoMedicamento} width={160} mr={'2.52vh'} error={error?.includes('posologia')}/>
                <Input label={'QTD'} emit={(v) => { medicamento.posologia[2] = v; setMedicamento({...medicamento, posologia: medicamento.posologia})}} mask={'999'} value={medicamento.posologia[2]} width={87} error={error?.includes('posologia')}/>
                <Select label={'Vezes ao:'} emit={(v) => { medicamento.posologia[3] = v; setMedicamento({...medicamento, posologia: medicamento.posologia}) }} value={medicamento.posologia[3]} items={_vezesAo} width={172} mr={'2.52vh'} error={error?.includes('posologia')}/>
                <div style={{width: '20vw'}}>
                    <div className="input-label--text" style={{ color: error?.includes('horarios')? 'red': 'black' }}>Horários:</div>
                    <MultiSelect
                        className={'select'}
                        options={_horarios}
                        value={horarios}
                        onChange={setHorarios}
                        labelledBy="Selecione"
                        hasSelectAll={false}
                        disableSearch={true}
                    />
                </div>
                <Select label={'Administração via:'} value={medicamento.administracao} items={administracaoVia} emit={(v) => { setMedicamento({...medicamento, administracao: v})}} width={275} ml={'2.52vh'} error={error?.includes('administracao')}/>
            </div>
            <div className={'row ' + styles.my}>
                <Input label={'Nome prescritor:'} value={medicamento.nome_prescritor} width={529} emit={(v) => setMedicamento({...medicamento, nome_prescritor: v})} error={error?.includes('nome_prescritor')}/>
                <Input label={'Número conselho:'} value={medicamento.numero_conselho} width={252} emit={(v) => setMedicamento({...medicamento, numero_conselho: v})} error={error?.includes('numero_conselho')}/>
                <Input label={'Data prescrição:'} value={medicamento.data_prescricao} width={252} emit={(v) => setMedicamento({...medicamento, data_prescricao: v})} error={error?.includes('data_prescricao')} mask={'99/99/9999'}/>
            </div>
            <div className={'row'}>
                <div className={'col'} style={{marginRight: '2.5vw', width: '25vw'}}>
                    <div className="input-label--text" style={{ color: error?.includes('periodo')? 'red': 'black' }}>Período de tratamento:</div>
                    <input className={"input icon"} value={period? formatDate(new Date(period[0])).concat(' - ').concat(formatDate(new Date(period[1]))): ''} onClick={() => toggle()}/>
                    <div className={styles.calendar} ref={calendar}>
                        <Calendar onChange={(v) => {toggle(); setPeriod(v); medicamento.periodo = v}} value={period} locale={'pt-BR'} selectRange={true}/>
                    </div>
                </div>
                <Input label={'Data de entrega:'} value={medicamento.data_entrega} width={252} emit={(v) => setMedicamento({...medicamento, data_entrega: v})} error={error?.includes('data_entrega')} mask={'99/99/9999'}/>
                <Input label={'Número do documento:'} value={medicamento.numero_documento} width={352} emit={(v) => setMedicamento({...medicamento, numero_documento: v})} error={error?.includes('numero_documento')}/>
                <div className={styles.info}>
                    <b>Observação:</b><br />
                    Quando o médico não indicar o horário na posologia, perguntar e comentar nesse campo a preferência do cliente. EX.: 1 vez ao dia
                </div>
            </div>
            {/*<div className={'row ' + styles.my}>*/}
            {/*</div>*/}
            <Navigator before={() => update()} to={'/novo/enviado'}/>
        </DefaultLayout>
    )
}