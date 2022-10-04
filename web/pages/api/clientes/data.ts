import AWS from 'aws-sdk'

const options = {
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}
const doc = new AWS.DynamoDB.DocumentClient(options)
const table = 'lembreme-clientes'

async function save(cliente) {
    const params = {
        TableName: table,
        Item: cliente
    }
    await doc
        .put(params)
        .promise()
        .then((data) => data)
        .catch((err) => err)
}

async function find(CPF) {
    const params = {
        TableName: table,
        Key: {
            CPF
        }
    }
    return await doc
        .get(params)
        .promise()
        .then((data) => data.Item)
        .catch((err) => err)
}

export default { save, find }