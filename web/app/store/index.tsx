import {useEffect} from "react";

export const store = {
    get(key) {
        return JSON.parse(sessionStorage.getItem(key))
    },
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    save(key, obj) {
        let current = store.get(key)
        if (!current) current = {}
        Object.entries(obj).forEach(([key, value]) => {
            current[key] = value
        })
        store.set(key, current)
    },
    remove(key) {
        sessionStorage.removeItem(key)
    }
}

// const get = (key) => {
//     useEffect(() => session.get(key))
// }
// function set(key, obj) {
//     useEffect(() => session.set(key, obj))
// }
// const save = (key, obj) => {
//     useEffect(() => session.save(key, obj))
// }
// const remove = (key) => {
//     useEffect(() => session.remove(key))
// }
//
// export default { get, set, remove, save }