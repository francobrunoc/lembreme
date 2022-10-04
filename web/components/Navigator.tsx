import { useRouter } from 'next/router'

export default function Navigator(props) {
    const router = useRouter()

    return (
        <div className={'footer'}>
            <div className={'row'}>
                <img src={'/icons/dark/arrow_left.svg'} className="mr-10 footer__icon--size pointer" onClick={() => router.back()}/>
                <div style={{width: '4.5vw'}}/>
                <img src={'/icons/dark/arrow_right.svg'} className="footer__icon--size pointer" onClick={async () => {
                    if (props.before) {
                        if (!await props.before()) return
                    }
                    await router.push(props.to)
                }}/>
            </div>
        </div>
    )
}