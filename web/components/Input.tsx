import InputMask from 'react-input-mask';

export default function Input(props) {
    return (
        <div className={'col'} style={{ width: props.width, marginRight: props.mr? props.mr: "2.222vw" }}>
            <div className="input-label--text" style={{ marginTop: props.spacing, color: props.error? 'red': 'black' }}>{ props.label }</div>
            {
                props.mask
                    ?
                    <InputMask mask={ props.mask } value={props.value} onChange={(e) => props.emit(e.target.value)}>
                        {
                            () => <input className={props.icon? "input icon": "input"} />
                        }
                    </InputMask>
                    :
                    <input className={props.icon? "input icon": "input"} value={props.value} placeholder={props.placeholder} onChange={(e) => props.emit(e.target.value)} />
            }
        </div>
    )
}