import db from './data'

export default async function handler(req, res) {
    try {
        const codigo = await db.save(JSON.parse(req.body))
        if (codigo) res.status(200).json('OK')
        else res.status(500).json('Error')
    } catch (e) {
        console.error(e)
    }
}