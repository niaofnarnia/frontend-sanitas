import './SendButton.css'
const SendButton = ({ texto = "Enviar" }) => {

  return <button className="StartButton">{texto}</button>;

};

export default SendButton;