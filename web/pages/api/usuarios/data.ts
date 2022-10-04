import AWS from 'aws-sdk'

const options = {
    apiVersion: '2012-08-10',
    region: process.env.AWS_SERVICE_REGION,
    accessKeyId: process.env.AWS_SERVICE_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SERVICE_SECRET_ACCESS_KEY
}

const doc = new AWS.DynamoDB.DocumentClient(options)
const table = 'lembreme-usuarios'

async function find(usuario) {
    const u = JSON.parse(usuario)
    const params = {
        TableName: table,
        Key: {
            matricula: Number(u.matricula),
            grupo: u.grupo
        }
    }
    return await doc
        .get(params)
        .promise()
        .then((data) => {
                if (data.Item.nome === u.nome.toUpperCase()) return data.Item
                else return {}
            }
        )
        .catch((err) => err)
}

export default { find }