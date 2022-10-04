import {DefaultLayout} from "../../../layouts/Default";
import Input from '../../../components/Input'
import style from '../../../styles/Acesso.module.css';
import {useEffect, useState} from "react";
import Navigator from '../../../components/Navigator'
import Message from "../../../components/Message";
import usuariosService from '../../../services/usuarios'
import {store} from "../../../app/store";

export default function AcessoPage() {
    const [nome, setNome] = useState(null)
    const [matricula, setMatricula] = useState(null)
    const [message, setMessage] = useState(null)
    const [page, setPage] = useState(null)

    useEffect(() => {
        setPage(store.get('page'))
    }, [])

    async function submit() {
        return await usuariosService.find(JSON.stringify({ matricula, nome, grupo: 'farmaceutico' }))
            .then((res) => {
                if (res.matricula) {
                    store.set('usuario', res)
                    return true
                }
                else {
                    setMessage('Usuário não encontrado ou sem autorização')
                    return false
                }
            })
            .catch(() => { setMessage('Ocorreu um erro ao buscar o usuário'); return false })
    }

    return (
        <DefaultLayout title={'Acesso'} spacing={false} next={'/andamento/acesso/bloqueado'} nonav={true}>
            <div className={'row body__subtitle--text'}>Para acessar o pedido, informe seu nome e matrícula.</div>
            <div className={'row ' + style.buttonsBar} >
                <div className={'col'} style={{marginRight: '4.375vw'}}>
                    <img src={'/acesso/person.svg'}/>
                </div>
                <div className={'col'}>
                    <Input label={'Nome colaborador:'} emit={(v) => setNome(v)} capital={true}/>
                    <Input label={'Matrícula:'} spacing={'4.72vh'} emit={(v) => setMatricula(v)} mask={'999999'}/>
                </div>
            </div>
            <div className={'row justify-center'}>
                <Message show={message !== null} close={() => setMessage(null)} severity={'error'} message={message}/>
            </div>
            <Navigator before={async() => await submit()} to={'/andamento/' + page}/>
        </DefaultLayout>
    )
}