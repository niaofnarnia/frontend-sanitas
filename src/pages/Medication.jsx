import { Link } from 'react-router-dom'
import './Medication.css'
import MedicationList from '../components/MedicationList'
import AddMedicationButton from '../components/addMedicationButton/AddMedicationButton'

const Medication = () => {
    return (
        <>
            <div className="legend">
                <div className="legend-item cronic">
                    <div className="legend-color"></div>
                    <span className='legend-text'>Crónico</span>
                </div>
                <div className="legend-item eventual">
                    <div className="legend-color"></div>
                    <span className='legend-text'>Eventual</span>
                </div>
                <div className="legend-item reciente">
                    <div className="legend-color"></div>
                    <span className='legend-text'>Reciente</span>
                </div>
            </div>

            <div className="box-medication">
                <h2 className="medication-title">Medicamentos</h2>
                <MedicationList></MedicationList>
            </div>

            <AddMedicationButton></AddMedicationButton>
        </>
    )
}

export default Medication