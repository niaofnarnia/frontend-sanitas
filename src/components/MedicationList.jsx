// src/components/MedicationList.jsx - Updated to use real API
import { useState, useEffect } from 'react';
import MedicationItem from './MedicationItem';
import { getAllMedications } from '../services/MedicationsServices';
import './MedicationList.css';

const MedicationList = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMedications = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Use the real API service
            const data = await getAllMedications();
            
            // Transform backend data to frontend format
            const transformedData = data.map(med => ({
                id: med.id,
                name: med.name,
                dosage: med.dose,
                frequency: med.frequencyDisplay,
                type: 'eventual', // You might want to add type field to backend
                notes: `Hora: ${med.timeToTake}`,
                dose: med.dose,
                time: med.timeToTake,
                startDate: new Date().toISOString().split('T')[0], // Default to today
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Default to 7 days
            }));
            
            setMedications(transformedData);
            setLoading(false);

        } catch (err) {
            console.error('Error al cargar los medicamentos:', err);
            setError('Error al cargar los medicamentos');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedications();
    }, []);

    if (loading) {
        return (
            <div className="emptyStateStyle">
                <p>Cargando medicamentos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="errorStyle">
                <p className='paragraph'>{error}</p>
                <button onClick={fetchMedications} className='button-retry'>
                    Reintentar
                </button>
            </div>
        );
    }

    if (medications.length === 0) {
        return (
            <div className="emptyStateStyle">
                <p>No hay medicamentos registrados</p>
                <button onClick={fetchMedications} className='button-update'>
                    Actualizar
                </button>
            </div>
        );
    }

    return (
        <div className="listStyle">
            {medications.map(medication => (
                <MedicationItem 
                    key={medication.id} 
                    medication={medication}
                />
            ))}
        </div>
    );
};

export default MedicationList;