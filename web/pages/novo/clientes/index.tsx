import {DefaultLayout} from "../../../layouts/Default";
import {store} from "../../../app/store";
import FormShow from '../../../components/cliente/FormShow'
import {useEffect, useState} from "react";

export default function ShowClientePage() {
    const [cliente, setCliente] = useState(null)
    useEffect(() => setCliente(store.get('cliente')), [])
    return (
        <DefaultLayout title = {'Dados do cliente'} next={'/novo/estoque'} spacing={true}>
            <FormShow
                nome = {cliente?.nome}
                CPF = {cliente?.CPF}
                endereco = {cliente?.endereco}
                numero = {cliente?.numero}
                complemento = {cliente?.complemento}
                distrito = {cliente?.distrito}
                cidade_estado = {cliente?.cidade_estado}
                CEP = {cliente?.CEP}
                referencia = {cliente?.referencia}
                fone1 = {cliente?.fone1}
                fone2 = {cliente?.fone2}
                responsavel = {cliente?.responsavel}
            />
        </DefaultLayout>
    )
}