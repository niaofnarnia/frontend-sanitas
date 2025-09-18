import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav id="top">
                <img className='img-logo-nav' src="public/logo-proyecto.png" alt="logo" />
                <ul>
                    <li className='menu-item'><Link to="/">Tratamiento</Link></li>
                    <li className='menu-item'><Link to="/">Medicamentos</Link></li>
                    {/* <li><Link>Alertas</Link></li> */}

                    {/* <li><Link>Modo oscuro</Link></li> */}
                </ul>
            </nav>
        </>
    )
}

export default Navbar