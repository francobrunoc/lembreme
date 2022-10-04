import styles from '../styles/Home.module.css'
import Link from "next/link";
import {HomeLayout} from "../layouts/Home";
import {useEffect, useState} from "react";
import pedidosService from '../services/pedidos'

export default function IntroPage() {
    const [andamentos, setAndamentos] = useState()
    const [todos, setTodos] = useState()
    const [finalizados, setFinalizados] = useState()

    useEffect(() => {
        pedidosService.listAll().then((pedidos) => {
            setAndamentos(pedidos.filter((p) => p.situacao === 'C' || p.situacao === 'CS' || p.situacao === 'S' || p.situacao === 'E').length)
            setFinalizados(pedidos.filter((p) => p.situacao === 'F').length)
            setTodos(pedidos.length)
        })
    }, [])
  return (
      <HomeLayout>
          <main className={styles.main}>
              <div className={"row justify-start " + styles.logoMargin}>
                  <img src='logo_lembreme.svg' className={"head__logo--size"} />
              </div>
              <div className={"row justify-space-evenly " + styles.bodyMargin}>
                  <Link href={'/novo/clientes/home'}>
                      <div className={"col center pointer " + styles.itemMargin}>
                          <img src="icons/dark/plus.svg" className={"body__icon--size"} />
                          <div className={"body__title--text " + styles.titleMargin}>Novo pedido</div>
                          <div className={"body__subtitle--text"}>Para iniciar um novo pedido e
                              enviar para produção, clique aqui.</div>
                      </div>
                  </Link>
                  <Link href={'/andamento'}>
                      <div className={"col center pointer " + styles.itemMargin}>
                        <img src="icons/dark/check_outline.svg" className={"body__icon--size"} />
                          {
                              andamentos? <div className={'icon--badge'}>{ andamentos }</div>: null
                          }
                        <div className={"body__title--text " + styles.titleMargin}>Pedidos em andamento</div>
                        <div className={"body__subtitle--text"}>Veja os pedidos que estão aguardando confirmação.</div>
                      </div>
                  </Link>
              </div>

              <div className={"row justify-space-evenly"}>
                  <Link href={'/finalizados'}>
                      <div className={"col center pointer " + styles.itemMargin}>
                          <img src="icons/dark/check.svg" className={"body__icon--size"} />
                          {
                              finalizados? <div className={'icon--badge'}>{ finalizados }</div>: null
                          }
                          <div className={"body__title--text " + styles.titleMargin}>Pedidos finalizados</div>
                          <div className={"body__subtitle--text"}>Veja todos os pedidos finalizados que aguardam retirada</div>
                      </div>
                  </Link>
                  <Link href={'/todos'}>
                      <div className={"col center pointer " + styles.itemMargin}>
                          <img src="icons/dark/menu.svg" className={"body__icon--size"} />
                          {
                              todos? <div className={'icon--badge'}>{ todos }</div>: null
                          }
                          <div className={"body__title--text " + styles.titleMargin}>Todos os pedidos</div>
                          <div className={"body__subtitle--text"}>Clique aqui para ter a todos os pedidos e relatórios semanais, mensais e anuais dos pedidos.</div>
                      </div>
                  </Link>
              </div>
          </main>
      </HomeLayout>
  )
}
