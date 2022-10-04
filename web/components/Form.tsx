import Text from '../components/Text'
import Input from '../components/Input'
import Select from '../components/Select'
import style from '../styles/Separacao.module.css'
import {useRef, useState} from "react";

export default function Form({ medicamento, emit, position, errors, situacao, editing }) {
    const form = useRef(null)
    const arrow = useRef(null)

    let collapsed = false
    const toggle = () => {
        if (collapsed) {
            form.current.style.maxHeight = 0
            arrow.current.style.transform = 'rotate(0deg)'
        }
        else {
            form.current.style.maxHeight = form.current.scrollHeight + 'px'
            arrow.current.style.transform = 'rotate(+90deg)'
        }
        collapsed = !collapsed
    }

    return (
        <div>
            <div className={style.tab} onClick={() => toggle()}>
                <div className={'row justify-space-evenly'}>
                    Medicamento { position + 1 }
                    <img src={'/arrow.svg'} ref={arrow}/>
                </div>
            </div>
            <div className={style.form} ref={form}>
                <div style={{padding: 40}}>
                    <div className={'row'}>
                        <Text label={'Nome do medicamento:'} width={530} mr={50} value={medicamento.nome_medicamento}/>
                        {
                            situacao === 'S' || editing?
                                <Input label={'Lote:'} width={207} mr={50} emit={(v) => emit(v, 'lote')} error={errors[position]?.includes('lote')}/>
                                :
                                <Text label={'Lote:'}  width={207} mr={50} value={medicamento.lote}/>
                        }
                        {
                            situacao === 'S' || editing?
                                <Input label={'Registro MS:'} width={207} emit={(v) => emit(v, 'registro_MS')} error={errors[position]?.includes('registro_MS')}/>
                                :
                                <Text label={'Registro MS:'}  width={207} mr={50} value={medicamento.registro_MS}/>
                        }
                    </div>
                    <div className={'row ' + style.my}>
                        <Text label={'Concentração:'} width={207}  mr={50} value={medicamento.concentracao}/>
                        <Text label={'Quantidade prescrita:'} width={270} mr={50} value={medicamento.quantidade_prescrita}/>
                        <Text label={'Data prescrição:'} width={207} mr={50} value={medicamento.data_prescricao}/>
                        <Text label={'Horários:'} width={207} value={medicamento.horarios}/>
                    </div>
                    <div className={'row'}>
                        <Text label={'Nome prescritor:'} width={515} mr={50} value={medicamento.nome_prescritor}/>
                        <Text label={'Nº conselho:'} width={163} mr={85} value={medicamento.numero_conselho}/>
                        {
                            situacao === 'S' || editing?
                                <Select items={['Selecione', 'Laboratório 1', 'Laboratório 2']} label={'Laboratório:'} width={209} emit={(v) => emit(v, 'laboratorio')} error={errors[position]?.includes('laboratorio')}/>
                                :
                                <Text label={'Laboratório:'} value={medicamento.laboratorio}/>
                        }
                    </div>
                    <div className={'row ' + style.mt}>
                        {
                            situacao === 'S' || editing?
                                <Input label={'Validade:'} mask={'99/99/9999'} width={207} value={medicamento.validade} emit={(v) => emit(v, 'validade')} error={errors[position]?.includes('validade')}/>
                                :
                                <Text label={'Validade:'} mask={'99/99/9999'} width={163} mr={85} value={medicamento.validade}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
