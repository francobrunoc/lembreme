import AWS from 'aws-sdk'

const options = {
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const doc = new AWS.DynamoDB.DocumentClient(options)
const table = 'lembreme-pedidos'
const codigoPedido = 'lembreme-pedido-codigo'

async function getId() {
    const params = {
        TableName: codigoPedido
    }
    return await doc
        .scan(params)
        .promise()
        .then(async(data) => {
            let { codigo } = data.Items[0]
            doc
                .delete({ TableName: codigoPedido, Key: { codigo }})
                .promise()
                .then(() => {
                    doc
                        .put({ TableName: codigoPedido, Item: { codigo: codigo + 1 }})
                        .promise()
                        .catch(() => codigo = false)
                })
                .catch(() => codigo = false)
            return codigo
        })
        .catch((err) => err)
}

async function save(pedido) {
    const codigo = await getId()
    if (!codigo) return null
    pedido.codigo = codigo
    const params = {
        TableName: table,
        Item: pedido
    }
    await doc
        .put(params)
        .promise()
        .then((data) => data)
        .catch((err) => err)
    return codigo
}

async function update(pedido) {
    const _update = JSON.parse(pedido)
    let params = {
        TableName: table,
        Key: { codigo: _update.codigo },
        UpdateExpression: 'SET medicamentos = :m, situacao = :s, impressao = :i',
        ExpressionAttributeValues: {
            ':m' : _update.medicamentos,
            ':s' : _update.situacao,
            ':i' : _update.impressao
        }
    }
    return await doc
        .update(params)
        .promise()
        .then((data) => data)
        .catch((err) => err)
}

async function find(codigo) {
    const params = {
        TableName: table,
        Key: {
            codigo: Number(codigo)
        }
    }
    return await doc
        .get(params)
        .promise()
        .then((data) => data.Item)
        .catch((err) => err)
}

async function list(situacao) {
    const params = {
        TableName: table,
    }
    return await doc
        .scan(params)
        .promise()
        .then((data) => {
            if (situacao) return data.Items
                .filter((pedido) => pedido.situacao === situacao)
                .sort((a, b) => { return a.codigo - b.codigo })
            else return data.Items.sort((a, b) => { return a.codigo - b.codigo })
        })
        .catch((err) => err)
}

async function listAll() {
    const params = {
        TableName: table,
    }
    return await doc
        .scan(params)
        .promise()
        .then((data) => data.Items)
        .catch((err) => err)
}

export default { save, find, list, listAll, update }