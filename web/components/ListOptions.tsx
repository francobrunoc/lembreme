export default function ListOptions(props) {
    return (
        <div className={'scroller'} style={{height: props.height, width: props.width}}>
            {
                props.items.map((item) => <div key={item.codigo} className={'option button row'} onClick={() => { props.emit(item) }}>{item.codigo}</div>)
            }
        </div>
    )
}