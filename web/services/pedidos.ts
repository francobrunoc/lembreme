const find = async (codigo) => {
    return await fetch('/api/pedidos/find', { method: 'POST', body: codigo }).then((res) => res.json())
}

const create = async (pedido) => {
    return await fetch('/api/pedidos/create', { method: 'POST', body: JSON.stringify(pedido) }).then((res) => res.json())
}

const list = async (situacao) => {
    return await fetch('/api/pedidos/list', { method: 'POST', body: situacao }).then((res) => res.json())
}

const listAll = async () => {
    return await fetch('/api/pedidos/listAll', { method: 'POST' }).then((res) => res.json())
}

const update = async (pedido) => {
    return await fetch('/api/pedidos/update', { method: 'POST', body: JSON.stringify(pedido) }).then((res) => res.json())
}

export default { find, create, list, update, listAll }