import db from './data'

export default async function handler(req, res) {
    try {
        await db.save(JSON.parse(req.body))
        res.status(200).json('OK')
    } catch (e) {
        console.error(e)
    }
}