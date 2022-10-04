import Header from "../components/Head";
import Sidebar from "../components/Sidebar";

export const DefaultCenteredLayout = (props: any) => {
    return (
        <div className="container clamed-gray__bg">
            <Header />
            <Sidebar />
            <main className={'main center justify-center'}>
                { props.children }
            </main>
        </div>
    )
}