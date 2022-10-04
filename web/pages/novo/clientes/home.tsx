import Link from "next/link";
import {DefaultCenteredLayout} from "../../../layouts/DefaultCenteredLayout";

export default function HomePage() {
    return (
       <DefaultCenteredLayout>
            <div className={"row justify-center"}>
                <Link href={'/novo/clientes/registro'}>
                    <div className={"col center pointer"}>
                        <img src={"/person-add.svg"} className="body__button--icon" />
                        <p className="body__title--text">Novo usuário</p>
                        <p className="body__subtitle--text">Quando o cliente não possuir cadastro, utilizar essa opção</p>
                    </div>
                </Link>
                <Link href={'/novo/clientes/busca'}>
                    <div className={"col center pointer"}>
                        <img src={"/person-board.svg"} className="body__button--icon" />
                        <p className="body__title--text">Usuário cadastrado</p>
                        <p className="body__subtitle--text">O cliente possui cadastro? Acesse seu perfil para iniciar um novo pedido.</p>
                    </div>
                </Link>
            </div>
       </DefaultCenteredLayout>
    )
}