import { Link } from 'react-router-dom'
import './Medication.css'
import { useState, useEffect } from 'react'
import MedicationList from '../components/MedicationList'

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
        </>
    )
}

export default Medication