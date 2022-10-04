export default function SelectComponent({ items, label, width, emit, mr = '0', ml = '0', error = null, value = null }, props) {
    return (
        <div style={{marginRight: mr, marginLeft: ml}}>
            <div className="input-label--text" style={{ marginTop: props.spacing, color: error? 'red': 'black' }}>{ label }</div>
            <select className={'select'} style={{ width: width }} onChange={(e) => emit(e.target.value)} value={value}>
                {
                    items.map((item) => <option value={item} key={item}>{item}</option>)
                }
            </select>
        </div>
    )
}