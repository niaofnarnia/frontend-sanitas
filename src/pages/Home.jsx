import { Link } from 'react-router-dom'
// import '..pages/Home.css'
import './Home.css'
import StarButton from '../components/startButton/StartButton.jsx'


const Home = () => {
    return (
        <>
            <div className="img-box">
                <Link to="/medication"><img className='img-logo' src="public\logo-proyecto.png" alt="" /></Link>
            </div>
                 <StarButton></StarButton>   
        </>
    )
}

export default Home