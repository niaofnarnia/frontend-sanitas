import { Link } from 'react-router-dom'
import ModifyMedicationButton from '../components/modifyMedicationButton/ModifyMedicationButton.jsx'
import BotonEliminarMedicacion  from '../components/botonEliminarMedicacion/botonEliminarMedicacion.jsx'
const EdditMedication = () => {
    return (
        <>
        <ModifyMedicationButton></ModifyMedicationButton>
        <BotonEliminarMedicacion></BotonEliminarMedicacion>
        </>
    )
}

export default EdditMedication