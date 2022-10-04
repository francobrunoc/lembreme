const find = async (usuario) => {
    return await fetch('/api/usuarios/find', { method: 'POST', body: usuario }).then((res) => res.json())
}

export default { find }