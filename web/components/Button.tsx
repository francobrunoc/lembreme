import {useRef} from "react";


export default function Button({ type = '', label, mr = '', to = '', emit = () => {}}) {
    let selected = false
    const btn = useRef(null)
    function change() {
        if (!selected) {
            selected = true
            btn.current.style.border = '3px solid #F28A48'
        }
        else {
            selected = false
            btn.current.style.border = '1px solid #808080'
        }
    }
    return <button
        ref={btn}
        className={"button " + type}
        style={{ marginRight: mr? mr: 0 }}
        onClick={() => { emit(); change(); }}
    >{ label }</button>
}