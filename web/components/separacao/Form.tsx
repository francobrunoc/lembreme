import {DefaultLayout} from "../../layouts/Default"
import Text from '../Text'
import Form from "../Form"
import Button from '../Button'
import style from '../../styles/Separacao.module.css'
import {useEffect, useState} from "react";
import pedidosService from '../../services/pedidos'
import {useRouter} from "next/router";
import {store} from "../../app/store";

export default function SeparacaoFormPage() {
    const router = useRouter()
    let codigoPedido = null
    let [errors, setErrors] = useState([])
    const [pedido, setPedido] = useState(null)
    const [situacao, setSituacao] = useState(null)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        codigoPedido = store.get('codigoPedido')
        pedidosService.find(codigoPedido).then((pedido) => {
            setPedido(pedido)
            setSituacao(pedido.situacao)
        })
    }, [])

    async function submit() {
        validate()
        for (const error of errors) {
            if (error.length > 0) return
        }
        await next()
    }

    async function next() {
        if (pedido.situacao === 'CS') {
            pedido.situacao = 'E'
            store.set('pedido', pedido)
            await router.push('/andamento/etiquetas/enviado')
        }
        if (pedido.situacao == 'C') {
            pedido.situacao = 'S'
            store.set('pedido', pedido)
            await router.push('/andamento/separacao/enviado')
        }
        else if (pedido.situacao === 'S') {
            pedido.situacao = 'CS'
            store.set('pedido', pedido)
            await router.push('/andamento/conferencia/enviado')
        }
    }

    function validate() {
        setErrors([])
        const _errors = []
        pedido.medicamentos.forEach((obj, index) => {
            _errors.push([])
            if (!obj.lote) _errors[index].push('lote')
            if (!obj.validade) _errors[index].push('validade')
            if (!obj.registro_MS) _errors[index].push('registro_MS')
            if (!obj.laboratorio) _errors[index].push('laboratorio')
        })
        errors = _errors
        setErrors(_errors)
    }

    function changeProperty(v, k, i) {
        pedido.medicamentos[i][k] = v
    }

    return (
        <DefaultLayout title={'Formulário de separação'} nonav={true}>
            <div className={'row body__subtitle--text'}>
                Verifique os medicamentos do pedido, faça a separação e preencha as informações adicionais:
            </div>
            <div className={'row ' + style.my}>
                <Text label={'Número do pedido'} value={pedido?.codigo} width={252}/>
            </div>
            <div className={'scroller ' + style.scroll}>
                {
                    pedido?.medicamentos.map((medicamento, index) =>
                        <Form
                            editing={editing}
                            position={index}
                            errors={errors}
                            key={medicamento.nome_medicamento}
                            situacao={pedido.situacao}
                            medicamento={medicamento}
                            emit={(v, k) => changeProperty(v, k, index)}
                        />)
                }
                <div className={'row justify-center'} style={{marginTop: 20}}>
                    <Button type={'colored'} label={'Confirmar'} mr={'4vh'} emit={async() => await submit()}/>
                    {
                        situacao === 'CS'? <Button type={'outlined'} label={'Corrigir'} emit={() => setEditing(true)}/>: null
                    }
                </div>
            </div>
        </DefaultLayout>
    )
}