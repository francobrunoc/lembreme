import Link from "next/link";
import styles from '../styles/Sidebar.module.css'
import {useRouter} from "next/router";

export default function Sidebar() {
    const router = useRouter()
    const selector = () => {
        if (router.route.includes('/novo')) return '17vh'
        else if (router.route.includes('/andamento')) return '26vh'
        else if (router.route.includes('/finalizados')) return '35.8vh'
        else if (router.route.includes('/todos')) return '45.12vh'
    }
    return (
        <div className="sidebar">
            <img src={'/selector.svg'} className={styles.selector} style={{top: selector(), color: '#fffb00'}}/>
            <Link href={'/'}>
                <div className="sidebar--head">
                    <img src="/logo_DC.svg" style={{margin: 0, paddingTop: '3vh', width: '7.819vw', height: '8.14vh'}} />
                </div>
            </Link>
            <Link href={'/novo/clientes/home'}>
                <div className={"row justify-center " + styles.my}>
                    <img src="/icons/light/plus.svg" className={"menu__icon--size"}></img>
                </div>
            </Link>
            <Link href={'/andamento'}>
                <div className={"row justify-center " + styles.my}>
                    <img src="/icons/light/check_outline.svg" className={"menu__icon--size"}></img>
                </div>
            </Link>
            <Link href={'/finalizados'}>
                <div className={"row justify-center " + styles.my}>
                    <img src="/icons/light/check.svg" className={"menu__icon--size"}></img>
                </div>
            </Link>
            <Link href={'/todos'}>
                <div className={"row justify-center " + styles.my}>
                    <img src="/icons/light/menu.svg" className={"menu__icon--size"}></img>
                </div>
            </Link>
        </div>
    )
}