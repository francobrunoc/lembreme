import {useRef} from "react";

export default function Dropdown({ label , children}) {
    const query = useRef(null)
    const arrow = useRef(null)
    let collapsed = false
    const toggle = () => {
        if (collapsed) {
            query.current.style.maxHeight = 0
            arrow.current.style.transform = 'rotate(0deg)'
        }
        else {
            query.current.style.maxHeight = query.current.scrollHeight + 'px'
            arrow.current.style.transform = 'rotate(+90deg)'
        }
        collapsed = !collapsed
    }
    return (
        <div>
            <div className={'tab'} onClick={() => toggle()}>
                <div className={'row justify-space-evenly'}>
                    { label }
                    <img src={'/arrow.svg'} ref={arrow}/>
                </div>
            </div>
            <div className={'form'} ref={query}>
                <div style={{padding: 40}}>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}
