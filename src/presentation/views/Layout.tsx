import Header from "../components/Header/Header.tsx";
import {Outlet} from "react-router-dom";
import Content from "../components/Content.tsx";

export default function Layout() {
    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <Content>
                <Outlet/>
            </Content>
        </div>
    );
}
