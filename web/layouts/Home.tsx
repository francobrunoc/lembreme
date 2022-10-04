import Header from "../components/Head";

export const HomeLayout = ({ children }) => {
    return (
        <div className="container clamed-gray__bg">
            <Header />
            { children }
        </div>
    )
}