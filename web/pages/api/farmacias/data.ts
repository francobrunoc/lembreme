import AWS from 'aws-sdk'

const options = {
    apiVersion: '2012-08-10',
    region: process.env.AWS_SERVICE_REGION,
    accessKeyId: process.env.AWS_SERVICE_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SERVICE_SECRET_ACCESS_KEY
}

const doc = new AWS.DynamoDB.DocumentClient(options)
const table = 'lembreme-farmacias'

async function find(inscricao) {
    const params = {
        TableName: table,
        Key: {
            inscricao
        }
    }
    return await doc
        .get(params)
        .promise()
        .then((data) => data.Item)
        .catch((err) => err)
}

export default { find }