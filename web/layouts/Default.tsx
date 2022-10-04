import Header from "../components/Head";
import Sidebar from "../components/Sidebar";
import Navigator from "../components/Navigator";

export const DefaultLayout = (props: any) => {
    return (
        <div className="container clamed-gray__bg">
            <Header />
            <Sidebar />
            <main className="main">
                {
                    props.title? <div className={'body__title--text row justify-start'} style={ props.spacing? { marginBottom: '5.5vh' }: { marginBottom: '1.15vh' } }>{ props.title }</div>: ''
                }
                {
                    props.children
                }
                {
                    props.nonav || <Navigator to={props.next}/>
                }
            </main>
        </div>
    )
}