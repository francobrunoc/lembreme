import Input from "../../../components/Input";
import Button from "../../../components/Button"
import {DefaultLayout} from "../../../layouts/Default";
import clientesService from '../../../services/clientes'
import {useRouter} from "next/router";
import {useState} from "react";
import Message from "../../../components/Message";
import { store } from '../../../app/store'

export default function BuscaClientePage() {
    const router = useRouter()
    let [CPF, setCPF] = useState('')
    let [message, setMessage] = useState(null)

    const submit = async () => {
        await clientesService.find(CPF).then((cliente) => {
            if (!cliente.statusCode) {
                store.set('cliente', cliente)
                router.push('/novo/clientes')
            }
            else setMessage('Cliente não encontrado')
        }).catch((e) => console.error(e))
    }

    return (
       <DefaultLayout title={'Pesquisar cliente cadastrado'} next={'/novo/clientes'} spacing={true}>
            <div className={"row"}>
                <Input id="CPF" label={"Insira o CPF do usuário:"} width={'46.667vw'} mask={'999.999.999-99'} icon={true} entity={'CPF'} emit={(CPF) => setCPF(CPF)}/>
            </div>
            <div className={"row"} style={{ marginTop: '3.15vh' }} onClick={submit}>
                <Button label={"Buscar"} type={'colored'} />
            </div>
            <Message message={message} show={message !== null} close={() => setMessage(null)} severity={'error'}/>
       </DefaultLayout>
    )
}