import db from "./data";

export default async function handler(req, res) {
    res.status(200).json(
        await db.find(req.body)
    )
}