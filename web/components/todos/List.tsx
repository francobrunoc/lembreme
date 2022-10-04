export default function ListComponent(props) {
    return (
        <div className={'scroller'} style={{height: props.height, width: props.width}}>
            {
                props.items.map((item) => {
                    return <div className={'row'} key={item.value}>
                        <div key={item} className={'option button row'}>
                            {item.value}
                            <div style={{marginLeft: 'auto'}}>{item.situacao}</div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}