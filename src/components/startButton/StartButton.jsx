import './StartButton.css'
import { Link } from 'react-router-dom'
const StartButton = ({ texto = "Entrar" }) => {

  return <Link to="/treatment" className="StartButton">{texto}</Link>

};

export default StartButton;
