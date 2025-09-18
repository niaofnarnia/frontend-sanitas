import { Link } from 'react-router-dom'
// import '..pages/Home.css'
import './Home.css'

const Home = () => {
    return (
        <>
            <div className="img-box">
                <Link to="/medication"><img className='img-logo' src="public\logo-proyecto.png" alt="" /></Link>
            </div>
            <Link to="/medication">Entrar</Link>
        </>
    )
}

export default Home