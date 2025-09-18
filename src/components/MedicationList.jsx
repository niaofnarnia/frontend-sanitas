import { useState, useEffect } from 'react'
import MedicationItem from './MedicationItem';
import { Link } from 'react-router-dom'
import './MedicationList.css'

const MedicationList = () => {
    const [medications, setMedications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const MedicationItem = ({ medication }) => {
        return (
            <div className="medication-item">
                <Link to={`/medication-detail/${medication.id}`} state={{ medication }}>
                    {medication.name}
                </Link>
            </div>
        );
    };

    const fetchMedications = async () => {
        try {
            setLoading(true)
            setError(null)
            // Simular llamada a API
            // const response = await fetch('/api/medications');
            // const data = await response.json();
            // Datos de ejemplo - reemplaza con tu llamada real
            const mockData = [
                {
                    id: 1,
                    name: "Ibuprofeno",
                    dosage: "400mg",
                    frequency: "Cada 8 horas",
                    type: "eventual",
                    notes: "Tomar con comida"
                },
                {
                    id: 2,
                    name: "Metformina",
                    dosage: "500mg",
                    frequency: "2 veces al día",
                    type: "cronico",
                    notes: "Para diabetes"
                },
                {
                    id: 3,
                    name: "Amoxicilina",
                    dosage: "250mg",
                    frequency: "Cada 12 horas",
                    type: "reciente",
                    notes: "Tratamiento por 7 días"
                }
            ];

            //Simular delay de red
            setTimeout(() => {
                setMedications(mockData)
                setLoading(false)
            }, 1000)

        } catch (err) {
            console.log('Error al cargar los medicamentos', err)
            setError('Error al cargar los medicamentos')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMedications()
    }, [])

    //const listStyle
    //const emptyStateStyle

    if (loading) {
        return (
            <div className="emptyStateStyle">
                <p>Cargando medicamentos...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="errorStyle">
                <p className='paragraph'>{error}</p>
                <button onClick={fetchMedications} className='button-retry'>Reintentar</button>
            </div>
        )
    }

    //estado vacío
    if (medications.length === 0) {
        return (
            <div className="emptyStateStyle">
                <p>No hay medicamentos registrados</p>
                <button onClick={fetchMedications} className='button-update'>Actualizar</button>
            </div>
        )
    }

    //lista de medicamentos 
    return (
        <div className="listStyle">
            {medications.map(medication => (
                <MedicationItem key={medication.id} medication={medication}></MedicationItem>
            ))}
        </div>
    )
}

export default MedicationList