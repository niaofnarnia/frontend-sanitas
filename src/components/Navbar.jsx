import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav id="top">
                <img src="public/logo-proyecto.png" alt="logo" />
                <ul>
                    <li><Link>Medicamentos</Link></li>
                    <li><Link>Alertas</Link></li>
                    {/* <li><Link>Modo oscuro</Link></li> */}
                </ul>
            </nav>
        </>
    )
}

export default Navbar