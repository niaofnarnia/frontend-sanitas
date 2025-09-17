import { Link } from 'react-router-dom';
import MedicationForm from "../components/MedicationForm";

const AddMedication = () => {
    const handleAddMedication = (data) => {
        console.log("Datos del formulario:", data);
        // Aquí puedes hacer POST a tu API o json-server
    };
    return (
        <>
            <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f0f4ff" }}>
                <MedicationForm onSubmit={handleAddMedication} buttonLabel="Guardar" />
            </div>
        </>
    )
}

export default AddMedication