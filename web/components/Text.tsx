import InputMask from 'react-input-mask';

export default function Text(props) {
    return (
        <div className={'col'} style={{ width: props.width, marginRight: props.mr? props.mr: "2.222vw" }}>
            <div className="input-label--text" style={{ marginTop: props.spacing, color: props.error? 'red': 'black' }}>{ props.label }</div>
            {
                props.mask
                    ?
                        <InputMask mask={ props.mask } value={props.value} onChange={(e) => props.emit(e.target.value)}>
                        {
                            () => <input className={props.icon? "input icon": "input"}  style={{ color: 'gray', background: 'white'}}/>
                        }
                        </InputMask>
                    :
                        <input className={props.icon? "input icon": "input"} disabled={true} placeholder={props.placeholder} value={props.value} onChange={(e) => props.emit(e.target.value)} style={{ color: 'gray', background: 'white' }}/>
            }
        </div>
    )
}