import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./Layout.css"
const Layout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container-section">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Layout