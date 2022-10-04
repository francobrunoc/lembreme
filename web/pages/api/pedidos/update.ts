import db from './data'

export default async function handler(req, res) {
    res.status(200).json(
        await db.update(req.body)
    )
}