import Cliente from "../app/model/Cliente";
import api from './index'

const API_HOST = process.env.API_HOST

const find = async (CPF: string) => {
    return await fetch('/api/clientes/find', { method: 'POST', body: CPF}).then((res) => res.json())
}

const create = async (cliente: Cliente) => {
    return await fetch('https://dits790ock.execute-api.sa-east-1.amazonaws.com/dev/cliente/create', { method: 'POST', body: JSON.stringify(cliente)}).then((res) => res)
}

export default { find, create }