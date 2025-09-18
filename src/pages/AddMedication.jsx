import { Link } from 'react-router-dom';
import MedicationForm from "../components/MedicationForm";
import "./AddMedication.css"
import ResetButton from "../components/resetButton/ResetButton.jsx" 

const AddMedication = () => {
    const handleAddMedication = (data) => {
        console.log("Datos del formulario:", data);

    };
    return (
        <>
            <div className="add-medication-page">
                <div className="logo-container">
                    <img src="../public/logo-proyecto.png" alt="Logo App" />
                </div>
                <div className="form-container">
                    <h1>Añade tu nueva medicación</h1>
                    <MedicationForm onSubmit={handleAddMedication} buttonLabel="Guardar" />
                </div>
            </div>
        <ResetButton></ResetButton>
        </>
    )
}

export default AddMedication