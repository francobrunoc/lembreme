import FormRegistry from "../../../components/cliente/FormRegistry";
import {DefaultLayout} from "../../../layouts/Default";
import { store } from '../../../app/store'
import Navigator from "../../../components/Navigator";
import Cliente from "../../../app/model/Cliente";
import clientesService from '../../../services/clientes'
import {useState} from "react";

let cliente: Cliente = new Cliente()

export default function RegistroClientePage() {
    const [error, setError] = useState([])
    const create = async () => {
        let incompleteFields = []
        Object.entries(cliente).forEach((c) => {
            if (!c[1]) incompleteFields.push(c[0])
        })
        if (!incompleteFields.length) {
            await clientesService.create(cliente)
            store.set('cliente', cliente)
            return true
        } else {
            setError(incompleteFields)
            return false
        }
    }

    return (
        <DefaultLayout title={'Preencha os dados do cliente'} nonav={true} spacing={true}>
            <FormRegistry
                nome = {(v) => cliente.nome = v }
                CPF = {(v) => cliente.CPF = v}
                endereco = {(v) => cliente.endereco = v}
                numero = {(v) => cliente.numero = v}
                complemento = {(v) => cliente.complemento = v}
                distrito = {(v) => cliente.distrito = v}
                cidade_estado = {(v) => cliente.cidade_estado = v}
                CEP = {(v) => cliente.CEP = v}
                referencia = {(v) => cliente.referencia = v}
                fone1 = {(v) => cliente.fone1 = v}
                fone2 = {(v) => cliente.fone2 = v}
                responsavel = {(v) => cliente.responsavel = v}
                error = {error}
            />
            <Navigator to={'/novo/clientes'} before={async() => await create()}></Navigator>
        </DefaultLayout>
    )
}