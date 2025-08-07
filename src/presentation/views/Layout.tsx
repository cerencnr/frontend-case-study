import Header from "../components/Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <div className="home-container py-2"
                 style={{height: 'calc(100% - 60px)', flexGrow: 1}}>
                <div className="container-fluid" style={{height: '100%'}}>
                    <div className="row" style={{height: '100%'}}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}
