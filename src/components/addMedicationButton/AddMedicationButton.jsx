import './AddMedicationButton.css'
import { Link } from 'react-router-dom'
const AddMedicationButton = () => {
 return <Link to="/add-medication"  className="addMedicationButton" type="button"></Link>
};
export default AddMedicationButton;

