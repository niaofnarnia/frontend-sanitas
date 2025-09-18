import './StartButton.css'
const StartButton = ({ texto = "Entrar" }) => {

  return <button className="StartButton">{texto}</button>;

};

export default StartButton;