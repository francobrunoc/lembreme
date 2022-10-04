export default function formatDate(date: Date) {
    if (date) {
        date = new Date(date)
        return date.getUTCDate().toString() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear()
    } else return null
}