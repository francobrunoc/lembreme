import Cliente from "../app/model/Cliente";

const find = async (CPF: string) => {
    return await fetch('/api/clientes/find', { method: 'POST', body: CPF}).then((res) => res.json())
}

const create = async (cliente: Cliente) => {
    return await fetch('/api/clientes/create', { method: 'POST', body: JSON.stringify(cliente) }).then((res) => res.json())
}

export default { find, create }