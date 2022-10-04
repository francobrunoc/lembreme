const find = async (inscricao) => {
    return await fetch('/api/farmacias/find', { method: 'POST', body: inscricao }).then((res) => res.json())
}

export default { find }