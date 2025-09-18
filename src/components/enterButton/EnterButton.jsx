import './EnterButton.css'
<imput className="EnterButton" type="button"></imput>
const EnterButton = ({ texto = "Entrar" }) => {

  return () <button className="StartButton">{texto}</button>;

};

export default EnterButton;

